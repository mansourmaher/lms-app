import Stripe from "stripe";

import {headers} from "next/headers"
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";


export async function POST(req:Request){
    const body=await req.text()
    const signature=headers().get("Stripe-Signature") as string

    let event:Stripe.Event
    try{
        event=stripe.webhooks.constructEvent(body,signature,process.env.STRIPE_WEBHOOK_SECRET!)
    }catch(e){
        return {
            status:400,
            body:"Invalid signature"
        }
    }
    const session=event.data.object as Stripe.Checkout.Session
    const userId=session?.metadata?.userId
    const courseId=session?.metadata?.courseId
    if(event.type==="checkout.session.completed"){
        if(!userId || !courseId){
            return {
                status:400,
                body:"Invalid metadata"
            }
        }
        console.log("checkout completed")
        await db.courseUser.create({
            data:{
                userId,
                courseId
            }
        })

    }else{
        return {
            status:400,
            body:"Invalid event type"
        }
    }
    return new NextResponse(null,{status:200})

}