"use client";
import { CardWrapper } from "@/components/Auth/Card-wrapper";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { ResetSchema } from "@/schemas";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/Auth/Form-error";
import { FormSucces } from "@/components/Auth/Form-succes";
import { useState, useTransition } from "react";
import { Reset } from "@/actions/reset";
import { Label } from "@/components/ui/label";

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [succes, setSucces] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSucces("");
    startTransition(() => {
      Reset(values).then((result) => {
        setError(result?.error);
        setSucces(result?.succes);

        localStorage.setItem("email", values.email);
      });
    });
  };

  return (
    <div className="flex   min-h-screen  bg-white ">
      <div
        className="hidden w-1/2 items-center justify-center bg-cover lg:flex"
        style={{
          backgroundImage: "url('/teaching2.png')",
          
        }}
      />
      <div className="px-24 lg:px-24 xl:px-24 mt-32 ml-32  ">
        <div className="flex items-center justify-center lg:min-h-[600px]">
          <div className="w-full max-w-sm space-y-4 shadow-lg border border-gray-200 rounded-lg p-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-blue-500">
                Password Recovery
              </h1>
              <p className=" dark:text-gray-400">
                Enter the email address associated with your account, and we’ll
                email you a link to reset your password.
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(() => {})}
                className="space-y-6"
              >
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Email"
                            type="email"
                          />
                        </FormControl>
                        <FormMessage>
                          {form.formState.errors.email?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
                <FormError message={error} />
                <FormSucces message={succes} />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isPending}
                  onClick={form.handleSubmit(onSubmit)}
                  variant="primary"
                >
                  Reset Password
                </Button>
              </form>
            </Form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <a href="/sign-in" className="px-2 bg-white text-gray-500">
                    Back to sign in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};
