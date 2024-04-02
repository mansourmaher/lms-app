import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-form";
import { DescreptionForm } from "./_components/descreption-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category";
import { PriceForm } from "./_components/price-form";
import { AttachementForm } from "./_components/attachement-form";
import { ChapterForm } from "./_components/chapter-form";
import Bannner from "@/components/banner";
import CourseAction from "./_components/courseAction";
import { boolean } from "zod";
import { auth } from "@/auth";
import { TargetForm } from "./_components/target-form";

const CourseIdPage = async ({
  params,
}: {
  params: {
    courseId: string;
  };
}) => {
  const userId = auth();
  if (!userId) {
    return redirect("/login");
  }
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachment: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  if (!course) {
    return redirect("/teacher/courses");
  }
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const chapterOfcourse = await db.chapter.findMany({
    where: {
      courseId: course.id,
      isPublished: false,
    },
  });
  const isAllchpaterOfcourseIsPublished = chapterOfcourse.length === 0;

  const requiredFields = [
    course.title,
    course.description,
    course.price,
    course.categoryId,
    course.imageUrl,
    course.attachment.length > 0,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `${completedFields}/${totalFields} fields completed`;
  const isCompleted = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Bannner title="This course is not yet published" />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span>Complete all fields {completionText}</span>
          </div>

          <CourseAction
            courseId={course.id}
            isCompleted={isCompleted}
            isPublished={course.isPublished}
            isAllchpaterOfcourseIsPublished={isAllchpaterOfcourseIsPublished}
          />
        </div>
        <div className="mt-16 grid md:grid-cols-2 gap-4">
          {/*md tzidha bach ki tsa8ar lpage twali kol form fi ligne*/}
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize course</h2>
            </div>
            <TitleForm initialeData={course} courseId={course.id} />
            <DescreptionForm initialeData={course} courseId={course.id} />
            <ImageForm initialeData={course} courseId={course.id} />
            <CategoryForm
              initialeData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course Chapter</h2>
              </div>
              <ChapterForm initialeData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Course Price</h2>
              </div>
              <PriceForm initialeData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Course Attachement</h2>
              </div>
              <AttachementForm initialeData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Course target</h2>
              </div>
              <TargetForm initialeData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CourseIdPage;
