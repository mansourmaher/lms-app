"use client";
import { getMycoursesnames } from "@/actions/teacher/get-coursename";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { VideoIcon } from "lucide-react";
import React, { useEffect } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { getMyconversation } from "@/actions/conversation/getmyconversation";

export function ListCoversation() {
  const router = useRouter();

  const [conversations, setConversations] =
    React.useState<Awaited<ReturnType<typeof getMyconversation>>>();

  useEffect(() => {
    const fetchConversation = async () => {
      const conversations = await getMyconversation();
      setConversations(conversations);
    };
    fetchConversation();
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          size={"sm"}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          List Coversation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select the cnversation</DialogTitle>
          <DialogDescription>
            Select the conversation you want to join
          </DialogDescription>
        </DialogHeader>

        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a conversation" />
          </SelectTrigger>
          <SelectContent>
            {conversations?.map((conversation) => (
              <SelectItem
                key={conversation.id}
                onClick={() => router.push(`/conversations/${conversation.id}`)}
                value={conversation.id}
              >
                {conversation.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </DialogContent>
    </Dialog>
  );
}
