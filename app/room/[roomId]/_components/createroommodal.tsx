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
import React, { useEffect, useState } from "react";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { startMeeting } from "@/actions/teacher/startmetting";
import toast from "react-hot-toast";
const FormSchema = z.object({
  course: z.string({
    required_error: "Please the course",
  }),
});

export function DialogDemo() {
  const [isPublicMeeting, setIsPublicMeeting] = useState(false);
  const [meetingname, setMeetingname] = useState("");
  const [meetingdescription, setMeetingdescription] = useState("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const router = useRouter();
  function onSubmit(data: z.infer<typeof FormSchema>) {
    router.push(`/room/${data.course}`);
  }
  const [courses, setCourses] = React.useState<
    Awaited<ReturnType<typeof getMycoursesnames>>
  >([]);
  useEffect(() => {
    const fetchcourses = async () => {
      const courses = await getMycoursesnames();
      setCourses(courses);
    };
    fetchcourses();
  }, []);
  const handelStartMeeting = async () => {
    const res = await startMeeting(meetingname, meetingdescription);
    toast.success("Meeting created successfully will be started now");
    router.push(`/room/${res.id}`);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          size={"sm"}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Create room
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mt-4">
          <DialogTitle className="flex justify-between items-center gap-x-2">
            <span className="flex gap-x-2 items-center">
              <VideoIcon size={24} />
              Create room
            </span>
            <Switch
              onCheckedChange={() => {
                setIsPublicMeeting(!isPublicMeeting);
              }}
            />
          </DialogTitle>
          <DialogDescription>
            {isPublicMeeting}
            {isPublicMeeting
              ? "Private meeting is only visible to your students"
              : "Public meeting is visible to everyone"}
          </DialogDescription>
        </DialogHeader>
        {isPublicMeeting ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6 flex flex-col justify-end"
            >
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Courses</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the course you want to stream" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button variant={"primary"} type="submit">
                Submit
              </Button>
            </form>
          </Form>
        ) : (
          <div className="flex flex-col   gap-y-4">
            <Label>Title meeting</Label>
            <Input
              placeholder="Title meeting"
              value={meetingname}
              onChange={(e) => setMeetingname(e.target.value)}
            />
            <Label>Description</Label>
            <Textarea
              placeholder="Description"
              value={meetingdescription}
              onChange={(e) => setMeetingdescription(e.target.value)}
            />

            <Button
              type="button"
              variant="primary"
              disabled={!meetingname || !meetingdescription}
              onClick={handelStartMeeting}
            >
              Start meeting
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
