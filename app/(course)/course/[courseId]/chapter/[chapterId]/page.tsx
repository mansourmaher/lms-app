import { auth } from "@/auth";
import { db } from "@/lib/db";
import EtudiantChapterAction from "../../_components/EtudiantChapter-action";
import ChapterHeader from "./_components/chapter-header";
import { hasReportChapter } from "@/actions/Etudiant/has-report-chapter";
import ChapterTitle from "./_components/chapter-title";
import ChapterVedio from "./_components/chapter-vedio";
import ChapterOption from "./_components/chapter-btns";
import ChapterDescreption from "./_components/chapter-descreption";

const ChapterPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const user = await auth();
  const userId = user?.user.id as string;

  const courseName = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    select: {
      title: true,
    },
  });

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
    },
    include: {
      course: true,
    },
  });

  const currentPostion = chapter?.position;
  const nextChapter = await db.chapter.findFirst({
    where: {
      courseId: params.courseId,
      // position: currentPostion! + 1,
    },
  });
  const previewsChapter = await db.chapter.findFirst({
    where: {
      courseId: params.courseId,
      // position: currentPostion! - 1,
    },
  });
  const existingReport = await hasReportChapter(params.chapterId);

  return (
    <div className="container">
      <ChapterHeader
        courseId={params.courseId}
        chapter={chapter}
        courseName={courseName?.title!}
        nextChapter={nextChapter}
        previewsChapter={previewsChapter}
      />
      <ChapterTitle />
      {/* <ChapterDescreption descreption={chapter?.descreption!} /> */}
      <ChapterVedio videosrc={chapter?.videoUrl} />
      <ChapterOption
        chapterId={params.chapterId}
        courseId={params.courseId}
        existingReport={existingReport}
      />
      {/* Check if chapter data exists */}
      {/* {chapter ? (
        <>
          {/* Iterate over chapter properties */}
      {/* {Object.entries(chapter).map(([key, value]) => (
            <div key={key} className="mb-2">
              <span className="font-bold">{key}:</span> {JSON.stringify(value)}
            </div>
          ))} */}
      {/* Display video if available */}
      {/* {chapter.videoUrl && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Video</h3>
              <video width="100%" controls>
                <source src={chapter.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div> */}
      {/* )} */}
      {/* <EtudiantChapterAction
            courseId={chapter.course.id}
            chapterId={chapter.id}
            userId={userId}
            chapter={chapter}
            existingReport={existingReport}
          /> */}
      {/* </> */}
      {/* )} */}
    </div>
  );
};

export default ChapterPage;
