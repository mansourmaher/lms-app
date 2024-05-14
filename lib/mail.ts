import { emit } from "process"
import {Resend} from "resend"
import { sendRealMail } from "./real_mail/mail"


const resend=new Resend(process.env.RESEND_API_KEY)


export const sendVerificationEmail=async(email:string,token:string)=>
{
    const confirmLink='http://localhost:3000/new-verification?token='+token
    await sendRealMail({
        
        to: email,
        name: email,
        subject: 'Confirm your email',
        body: `<p>Click <a href="${confirmLink}">here</a> to confirm your email</p>`,
    })


}

export const sendPasswordResetEmail=async(email:string,token:string)=>
{
    
    const resetLink='http://localhost:3000/reset-password?token='+token
    await sendRealMail({
       
        to: email,
        name: email,
        subject: 'Reset your password',
        body: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
    })
}