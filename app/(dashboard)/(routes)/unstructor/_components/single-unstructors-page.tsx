import { getAllUnstroctor } from "@/actions/teacher/get-all-unstroctor";
import UnstroctorCard from "./untroctor-card";
import UntroctorList from "./untroctor-list";

interface SingleUnstructorsPageProps {
  teachers: Awaited<ReturnType<typeof getAllUnstroctor>>;
}
const SingleUnstructorsPage = ({ teachers }: SingleUnstructorsPageProps) => {
  return (
    <div className="m-8">
      <p className="text-2xl font-bold mb-8">
        Recommendation formateur for you
      </p>
      <div className="mb-6">
        <span>
          Here are a few Formateur we think you will liked base on here Rating
          and Reviews
          <br />
          Other student with similar interest have found these courses helpful
        </span>
      </div>
      <div>
        <UntroctorList teachers={teachers} />
      </div>
    </div>
  );
};
export default SingleUnstructorsPage;
