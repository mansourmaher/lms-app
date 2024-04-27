import { auth } from "@/auth"
import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req:Request,{params}:{params:{courseId:string}}){
    
    
    try{
        const courseId=params.courseId
        const user=await auth()
        if(!user){
            return {
                status:401,
                body:{
                    message:"Unauthorized"
                }
            }
        }
        const course=await db.course.findUnique({
            where:{
                id:courseId,
                isPublished:true
            }
        })
        const courseUser = await db.courseUser.findUnique({
            where: {
            userId_courseId: {
                userId: user.user.id as string,
                courseId: courseId,
            },
            
            },
            
        });
        if(courseUser){
            return {
                status:400,
                body:{
                    message:"You already purchased this course"
                }
            }
        }
        if(!course){
            return {
                status:404,
                body:{
                    message:"Course not found"
                }
            }
        }
        const line_items:Stripe.Checkout.SessionCreateParams.LineItem[]= [{
            quantity: 1,
            price_data:{
                currency:"usd",
                product_data:{
                    name:course.title,
                    description:course.description!,
                },
                unit_amount:Math.round(course.price!*100)
            }
        }]
        let stripeCustomer=await db.stripeCustomer.findFirst({
            where:{
                userId:user.user.id as string
            },
            select:{
                stripeCustomerId:true
            
            }
        })
        if(!stripeCustomer){
            const customer=await  stripe.customers.create({
                email:user.user.email!
            })
            stripeCustomer=await db.stripeCustomer.create({
                data:{
                    userId:user.user.id as string,
                    stripeCustomerId:customer.id
                }
            });
        }
        const session=await stripe.checkout.sessions.create({
            customer:stripeCustomer.stripeCustomerId,
            line_items,
            mode:"payment",
            success_url:`${process.env.NEXT_PUBLIC_APP_URL}/course/${courseId}?success=1`,
            cancel_url:`${process.env.NEXT_PUBLIC_APP_URL}/course/${courseId}?canceled=1`,
            metadata:{
                userId:user.user.id as string,
                courseId
            }
        })
        await db.courseUser.create({
            data:{
                userId:user.user.id as string,
                courseId
            }
        })
        return NextResponse.json({
            url:session.url
        })
        





    }catch(e){
        return {
            status:500,
            body:{
                message:e
            }
        }
    }
}