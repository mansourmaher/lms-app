import { db } from "@/lib/db";
import ChapterHeader from "./chapter-header";
import ChapterTitle from "./chapter-title";
import ChapterVedio from "./chapter-vedio";

import { hasReportChapter } from "@/actions/Etudiant/has-report-chapter";
import ChapterReport from "./chapter-report";
import ChapterButtons from "./chapter-btns";
import ChapterDescreption from "./chapter-descreption";
import { getChapterById } from "@/actions/chapter/get-chapter-by-id";
import ChapterResources from "./chapter-resources";
import { ScrollArea } from "@/components/ui/scroll-area";
import PdfModal from "@/app/(dashboard)/(routes)/teacher/check/_components/pdf-modal";
import { auth } from "@/auth";

interface ChapterPageProps {
  courseId: string;
  chapterId: string;
}

const SingleChapterPage = async ({ courseId, chapterId }: ChapterPageProps) => {
  const courseName = await db.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      title: true,
    },
  });

  const chapter = await getChapterById(chapterId);

  const currentPostion = chapter?.position;
  const nextChapter = await db.chapter.findFirst({
    where: {
      courseId: courseId,
      // position: currentPostion! + 1,
      isPublished: true,
    },
  });
  const previewsChapter = await db.chapter.findFirst({
    where: {
      courseId: courseId,
      //  position: currentPostion! - 1,
      isPublished: true,
    },
  });
  const existingReport = await hasReportChapter(chapterId);
  const user = await auth();
  const userId = user?.user.id as string;

  const isCompltedthechapter = await db.userProgress.findFirst({
    where: {
      chapterId: chapterId,
      userId: userId,
    },
    select: {
      isCompleted: true,
    },
  });
  return (
    <div>
      <ChapterHeader
        courseId={courseId}
        chapter={chapter}
        courseName={courseName?.title!}
        nextChapter={nextChapter}
        previewsChapter={previewsChapter}
      />
      {/* <ChapterTitle title={chapter?.title!} /> */}
      <div className="flex items-start  w-full ">
        <ChapterVedio videosrc={chapter?.videoUrl} />
        <div className="border-l-2 border-slate-400 h-[500px] pr-2"></div>
        <div className="flex flex-col gap-y-4 w-full  pr-4  h-[500px] ">
          <ChapterReport
            chapterId={chapterId}
            courseId={courseId}
            existingReport={existingReport}
          />

          <div className="h-[200px]  mb-8 ">
            <ScrollArea>
              <ChapterResources resources={chapter?.resources!} />
            </ScrollArea>
          </div>
        </div>
      </div>

      <ChapterButtons
        chapter={chapter!}
        hasreport={!!existingReport}
        courseId={courseId}
        isCompltedthechapter={isCompltedthechapter?.isCompleted!}
      />
      <hr className="m-8 mt-12" />
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-x-6">
        <ChapterDescreption descreption={chapter?.descreption!} />
      </div>
    </div>
  );
};

export default SingleChapterPage;
