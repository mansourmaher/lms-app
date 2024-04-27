"use client";

import { createMessage } from "@/actions/conversation/createmessage";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateMessageSchemaType, createMessageSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

interface ConversationFormProps {
  conversationId: string;
}

export function ConversationForm({ conversationId }: ConversationFormProps) {
  const createMessageForm = useForm<CreateMessageSchemaType>({
    resolver: zodResolver(createMessageSchema),
  });
  const router = useRouter();

  async function onSubmit(data: CreateMessageSchemaType) {
    await createMessage(conversationId, data.message);
    createMessageForm.reset();
    router.refresh();
  }
  return (
    <div className="mb-14 border-t bg-white px-4 py-4 lg:mb-0">
      <Form {...createMessageForm}>
        <form
          onSubmit={createMessageForm.handleSubmit(onSubmit)}
          className="flex w-full items-center gap-2 lg:gap-4"
        >
          <FormField
            control={createMessageForm.control}
            name="message"
            render={({ field }) => (
              <FormControl>
                <div className="relative w-full">
                  <Input {...field} placeholder="Type a message" />
                </div>
              </FormControl>
            )}
          />

          <Button size={"icon"} type="submit">
            <SendIcon className="h-4 w-4" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
