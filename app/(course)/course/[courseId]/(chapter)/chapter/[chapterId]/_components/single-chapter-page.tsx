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
      position: currentPostion! + 1,
    },
  });
  const previewsChapter = await db.chapter.findFirst({
    where: {
      courseId: courseId,
      position: currentPostion! - 1,
    },
  });
  const existingReport = await hasReportChapter(chapterId);
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
        <div className="flex flex-col gap-y-4 w-full  pr-4">
          <ChapterReport
            chapterId={chapterId}
            courseId={courseId}
            existingReport={existingReport}
          />
          <div>
            <ChapterResources resources={chapter?.resources!} />
          </div>
        </div>
      </div>

      <ChapterButtons
        chapter={chapter!}
        hasreport={!!existingReport}
        courseId={courseId}
      />
      <hr className="m-8" />
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-x-6">
        <ChapterDescreption descreption={chapter?.descreption!} />
      </div>
    </div>
  );
};

export default SingleChapterPage;
