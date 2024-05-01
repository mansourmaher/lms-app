import Stripe from "stripe";

import {headers} from "next/headers"
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";


export async function POST(req:Request):  Promise<void | Response> {{
    const body=await req.text()
    const signature=headers().get("Stripe-Signature") as string

    let event:Stripe.Event
    try{
        event=stripe.webhooks.constructEvent(body,signature,process.env.STRIPE_WEBHOOK_SECRET!)
    }catch(e){
        
            return new NextResponse(null,{status:400})




    }
    const session=event.data.object as Stripe.Checkout.Session
    const userId=session?.metadata?.userId
    const courseId=session?.metadata?.courseId
    if(event.type==="checkout.session.completed"){
        if(!userId || !courseId){
            return new NextResponse(null,{status:400})

        }
        console.log("checkout completed")
        await db.courseUser.create({
            data:{
                userId,
                courseId
            }
        })
        await db.course.update({
            where:{
                id:courseId
            },
            data:{
                totalPurchases:{
                    increment:1
                
            }

            }
        })

    }else{
        return new NextResponse(null,{status:401})

    }
    return new NextResponse(null,{status:200})

}}