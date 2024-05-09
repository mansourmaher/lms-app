import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/hooks/getCurrentUser";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Verified } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChangePasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updatePassword } from "@/actions/Etudiant/update-password";
import { useState } from "react";
import { resetPassword } from "@/actions/reset";
import { Separator } from "@/components/ui/separator";

interface Props {
  user: Awaited<ReturnType<typeof getCurrentUser>>;
  isTeacherhasRequest: boolean;
}

const Setting = ({ user, isTeacherhasRequest }: Props) => {
  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (values: z.infer<typeof ChangePasswordSchema>) => {
    setError(null);
    setSuccess(null);
    if (values.newPassword !== values.confirmNewPassword) {
      setError("Password not match");
      return;
    }
    const res = await updatePassword(values);
    if (res.error) {
      setError(res.error);
      return;
    }
    if (res.success) {
      setSuccess(res.success);
      return;
    }
  };
  const sendEmailReset = async () => {
    const res = await resetPassword();
    if (res.error) {
      setError(res.error);
      return;
    }
    if (res.succes) {
      setSuccess(res.succes);
      return;
    }
  };

  return (
    <>
      <Separator className="mb-6" />
      <div className=" mx-16 flex justify-center ">
        {user?.role === "TEACHER" &&
        user?.teacherAccess === false &&
        isTeacherhasRequest ? (
          <Badge
            className=" mt-2 text-center  rounded-md py-2"
            variant="yellow"
          >
            {/* give me a better display and better message */}
            You Request is Pending
          </Badge>
        ) : (
          <Badge className=" text-center rounded-md py-4" variant="primary">
            <div className="flex items-center justify-center gap-x-2">
              <span className="text-center">
                Congratulation you are a verified teacher
              </span>
              <Verified className="h-4 w-4" />
            </div>
          </Badge>
        )}
      </div>

      <div className="flex justify-start  gap-x-2 max-w-[800px]">
        <div className="max-w-[400px] flex flex-col space-y-2">
          <div className="max-w-md mx-auto ">
            <h1 className="text-2xl font-semibold mb-6">Change password</h1>
            <div className="flex flex-col gap-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="oldPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="oldPassword">
                            Old password
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              id="oldPassword"
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage>
                            {form.formState.errors.oldPassword?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="oldPassword">
                            New password
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              id="oldPassword"
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage>
                            {form.formState.errors.newPassword?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="confirmNewPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="confirmPassword">
                            Confirm new password
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              id="oldPassword"
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage>
                            {form.formState.errors.confirmNewPassword?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>
                  <p className="text-sm mt-2">
                    Make sure it's at least 15 characters OR at least 8
                    characters including a number and a lowercase letter.
                    <Link className="text-blue-600" href="#">
                      Learn more.
                    </Link>
                  </p>
                  {error && (
                    <Badge
                      className="w-full mt-2  rounded-md py-2"
                      variant="destructive"
                    >
                      {error}
                    </Badge>
                  )}
                  {success && (
                    <Badge
                      className="w-full mt-2  rounded-md py-2"
                      variant="green"
                    >
                      {success}
                    </Badge>
                  )}
                  <div className="flex items-center justify-between mt-4">
                    <Button
                      variant="primary"
                      disabled={
                        form.formState.isSubmitting || !form.formState.isValid
                      }
                    >
                      Update password
                    </Button>
                    <p
                      className="text-sm text-blue-600"
                      onClick={sendEmailReset}
                    >
                      I forgot my password
                    </p>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Setting;
