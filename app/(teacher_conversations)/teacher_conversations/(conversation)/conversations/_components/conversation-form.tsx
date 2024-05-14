"use client";

import {
  createMessage,
  uploadFileinconversation,
  uploadimageinconversation,
} from "@/actions/conversation/createmessage";
import { CommunityUploadImage } from "@/app/(community)/community/_componets/comunity-upload-image";
import { UploadFileInconversation } from "@/app/(conversation)/conversations/_components/uploadfile";
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
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [file, setFile] = React.useState<string | null>(null);

  async function onSubmit(data: CreateMessageSchemaType) {
    await createMessage(conversationId, data.message);
    createMessageForm.reset();
    createMessageForm.setValue("message", "");
    router.refresh();
  }
  const handelIploadImage = async (url: string) => {
    await uploadimageinconversation(conversationId, url);
    setImageUrl(null);
    router.refresh();
  };
  const handelUpoadFile = async (url: string) => {
    await uploadFileinconversation(conversationId, url);
    setFile(null);
    router.refresh();
  };

  return (
    <div className="mb-14 border-t bg-white px-4 py-4 lg:mb-0 flex items-center">
      <UploadFileInconversation
        communityId={conversationId}
        onchange={(url) => {
          setFile(url);
          handelUpoadFile(url);
        }}
      />
      <CommunityUploadImage
        communityId={conversationId}
        onchange={(url) => {
          setImageUrl(url);
          handelIploadImage(url);
        }}
      />
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

          <Button
            size={"icon"}
            type="submit"
            className="text-white bg-sky-400 hover:bg-sky-500 "
            disabled={
              createMessageForm.formState.isSubmitting ||
              !createMessageForm.formState.isValid
            }
          >
            <SendIcon className="h-4 w-4 " />
          </Button>
        </form>
      </Form>
    </div>
  );
}
