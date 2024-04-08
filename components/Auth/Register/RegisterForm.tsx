"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  FormField,
} from "../../ui/form";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { FormError } from "../Form-error";
import { FormSucces } from "../Form-succes";
import { useState, useTransition } from "react";
import { register } from "@/actions/register";
import { Loader, Slice, WavesIcon } from "lucide-react";
import Link from "next/link";
import { Social } from "../Social";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [succes, setSucces] = useState<string | undefined>("");

  const [selected, setSelected] = useState<string>("STUDENT");
  const onChange = () => {
    setSelected(selected === "STUDENT" ? "TEACHER" : "STUDENT");
  };

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      role: "STUDENT",
    },
  });
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    values.role = selected;
    setError("");
    setSucces("");
    startTransition(() => {
      register(values).then((result) => {
        setError(result?.error);
        setSucces(result?.succes);
      });
    });
  };

  return (
    <div className="flex min-h-screen bg-white max-h-full">
      <div
        className="hidden w-1/2 items-center justify-center bg-cover lg:flex"
        style={{
          backgroundImage: "url('/teaching2.png')",
          textAlign: "center",
        }}
      />
      <div className="flex w-1/2 items-center justify-center p-12">
        <div className="w-full max-w-md shadow-xl  rounded-lg p-6">
          <div className="flex justify-center mb-6">
            
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Welcome to the community
          </h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => {})}
              className="mt-8 space-y-6 "
              aria-disabled={isPending}
            >
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
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Username"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="*******"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <div>
                Do you want to register as a{" "}
                <span
                  onClick={onChange}
                  className="font-bold text-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer"
                >
                  {selected} {selected === "STUDENT" ? "🎓" : "👨‍🏫"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm"></div>
                </div>
              </div>
              <FormError message={error} />
              <FormSucces message={succes} />
              <Button
                type="submit"
                disabled={isPending}
                onClick={form.handleSubmit(onSubmit)}
                className="w-full bg-indigo-600"
                variant="primary"
              >
                {isPending ? <Loader className="animate-spin" /> : "Register"}
              </Button>
            </form>
          </Form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="w-full">
              <Social />
            </div>
            <span className="text-sm text-gray-600">
              <Link
                className="font-medium text-gradient-to-r from-cyan-500 to-blue-500"
                href="/sign-in"
              >
                Already have an account? Sign in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
