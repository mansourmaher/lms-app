"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function getConversation(id: string) {
    try {
      const user=await auth();
  
      if (!user?.user?.email) {
        throw new Error("Not authenticated");
      }
  
      const currentUser = await db.user.findUnique({
        where: { email: user.user.email }
      });
  
      if (!currentUser) {
        throw new Error("User not found");
      }
  
      const conversation = await db.conversation.findUnique({
        where: {
          id: id,
        },
        select: {
            id: true,
            paticipantsId: true,
            title: true,
            createdAt: true,

            
        
          messages: {
            include: {
              sender: true,
            },
          },
        },
      });
  
      if (!conversation) {
        throw new Error("Conversation not found");
      }
  
      return conversation;
    } catch (error) {
      console.log(error);
    }
  }