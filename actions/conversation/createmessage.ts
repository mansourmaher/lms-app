"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";

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
    //   ServerPusher.trigger(`conversation-${conversationId}`, "new-messagesssss", {
    //     message: newMessage,
      
  
    //   revalidatePath(`/conversations/${conversationId}`);
  
      return newMessage;
    } catch (error) {
        console.log(error);
    }
  }