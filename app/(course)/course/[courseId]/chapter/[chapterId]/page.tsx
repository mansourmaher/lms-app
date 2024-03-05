import { auth } from "@/auth";
import { db } from "@/lib/db";
import EtudiantChapterAction from "../../_components/EtudiantChapter-action";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import ChapterHeader from "./_components/chapter-header";
import { useRouter } from "next/navigation";

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
        position: currentPostion! + 1,
      },
    });
    const previewsChapter = await db.chapter.findFirst({
      where: {
        courseId: params.courseId,
        position: currentPostion! - 1,
      },
    });

   



  return (
    <div className="container">
      <ChapterHeader
        courseId={params.courseId}
        chapter={chapter}
        courseName={courseName?.title!}
        nextChapter={nextChapter}
        previewsChapter={previewsChapter}
        
      />
      <h1 className="text-3xl font-bold mb-4">
        Chapter Page {params.chapterId}
      </h1>

      {/* Check if chapter data exists */}
      {chapter ? (
        <>
          {/* Iterate over chapter properties */}
          {Object.entries(chapter).map(([key, value]) => (
            <div key={key} className="mb-2">
              <span className="font-bold">{key}:</span> {JSON.stringify(value)}
            </div>
          ))}

          {/* Display video if available */}
          {chapter.videoUrl && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Video</h3>
              <video width="100%" controls>
                <source src={chapter.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          <EtudiantChapterAction
            courseId={chapter.course.id}
            chapterId={chapter.id}
            userId={userId}
            chapter={chapter}
          />
        </>
      ) : (
        <p className="text-red-500">Chapter not found</p>
      )}
    </div>
  );
};

export default ChapterPage;
