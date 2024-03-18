import { db } from "@/lib/db";
import SingleChapterPage from "./_components/single-chapter-page";

const ChapterPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
    },
    include: {
      course: true,
    },
  });

  return (
    <>
      <SingleChapterPage
        courseId={params.courseId}
        chapterId={params.chapterId}
      />
    </>
  );
};

export default ChapterPage;
