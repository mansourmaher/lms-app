"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export async function createMessage(conversationId: string, message: string) {
    try {
      const user = await auth();
  
      if (!user?.user?.email) {
        console.log("Not authenticated");
      }
  
      const currentUser = await db.user.findUnique({
        where: { email: user!.user.email! },
      });
  
      if (!currentUser) {
        console.log("Not authenticated");
      }
  
      
  
      const newMessage = await db.message.create({
        data: {
          body: message,
          conversation: {
            connect: {
              id: conversationId,
            },
          },
          sender: {
            connect: {
              id: user?.user.id as string,
            },
          },
        },
        include:{
          sender:true
        }
      });
       await pusherServer.trigger(`conversation.${conversationId}`, "new-messagesssss", {
         newMessage,
       });
       
      
  
    //   revalidatePath(`/conversations/${conversationId}`);
  
      return newMessage;
    } catch (error) {
        console.log(error);
    }
  }