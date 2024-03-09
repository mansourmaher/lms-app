import { auth } from "@/auth";
import { db } from '@/lib/db';
import { NextApiResponse } from "next";
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request, res: NextApiResponse) {
  const user = await auth();
  const { fileUrl } = await req.json();
  

  if (!fileUrl) {
    return new NextResponse("URL is required", { status: 400 });
  }

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const isTeacher = user?.user.role === "TEACHER";
  if (!isTeacher) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (fileUrl && user.user.id) {
    await db.teacherRequest.create({
      data: {
        title:fileUrl.name,
        url: fileUrl.url,
        userId: user.user.id
      }
    });

    const confirmLin="http://localhost:3000/accept-request?id="+user.user.id
    const declinedLink="http://localhost:3000/admin/teacher-requests/?id="+user.user.id

    

    await
   

    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: "mansourmaher77@gmail.com",
      subject: "Teacher Access Request",
      html: `<p>Teacher ${user.user.name} has requested access to be a teacher.<br>
      This is the file they uploaded: <a href="${fileUrl.url}">${fileUrl.name}</a><br>
      Click <a href="${confirmLin}">here</a> to confirm the request or <a href="${declinedLink}">here</a> to decline the request</p>`,
    });
  }

  return new NextResponse("Request sent successfully", { status: 200 });
}
