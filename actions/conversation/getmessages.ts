"use server"
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function getMessages(conversationId: string) {
    try {
      const user=await auth();
  
      if (!user?.user?.email) {
        throw new Error("Not authenticated");
      }
  
      const currentUser = await db.user.findUnique({
        where: { email: user.user.email },
      });
  
      if (!currentUser) {
        throw new Error("User not found");
      }
  
      const messages = await db.message.findMany({
        where: {
          conversationId,
        },
        include: {
          sender: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
  
      return messages;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }