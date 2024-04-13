"use client";
import { forwardRef, useEffect, useMemo, useState } from "react";

import { getTeacherWithCoursesCount } from "@/actions/Etudiant/get-teacher-name";
import qs from "query-string";
import { usePathname, useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getCoursesNameAndImage } from "@/actions/course/get-courses-image-name";

interface valueProps extends React.InputHTMLAttributes<HTMLInputElement> {
  courses: Awaited<ReturnType<typeof getCoursesNameAndImage>>;
}

export default forwardRef<HTMLInputElement, valueProps>(function value(
  { courses, ...props },
  ref
) {
  const [value, setvalue] = useState("");
  const [hasFocus, setHasFocus] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const debouncedValue = useDebounce(value);
  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: value,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [debouncedValue, pathname, router]);
  const [isValueSelected, setIsValueSelected] = useState(false);

  const cities = useMemo(() => {
    if (!value.trim()) return [];

    const searchWords = value.split(" ");

    return courses

      .filter(
        (course) =>
          course.title?.toLowerCase().includes(searchWords[0].toLowerCase()) &&
          searchWords.every((word) =>
            course.title.toLowerCase().includes(word.toLowerCase())
          )
      )
      .slice(0, 5);
  }, [value]);

  const issearchPage = pathname?.includes("/search");

  return (
    <div className="w-[350px] relative">
      {!issearchPage && (
        <div className="flex relative w-[350px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200">
          <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-slate-500" />
          <div className="flex w-full">
            <Input
              placeholder="Browse Your Courses..."
              type="search"
              value={value}
              onChange={(e) => setvalue(e.target.value)}
              onFocus={() => setHasFocus(true)}
              onBlur={() => setHasFocus(false)}
              className="border-none bg-transparent w-full pl-11 rounded-full focus-visible:ring-slate-200 "
              {...props}
              ref={ref}
            />
          </div>
        </div>
      )}
      {issearchPage && (
        <div className="relative w-[350px]">
          <div className="flex w-full">
            <Input
              placeholder="Search for a Course..."
              type="search"
              value={value}
              onChange={(e) => setvalue(e.target.value)}
              onFocus={() => setHasFocus(true)}
              onBlur={() => setHasFocus(false)}
              className="border-none bg-transparent w-full pl-11 rounded-full focus-visible:ring-slate-200 border-r-2"
              {...props}
              ref={ref}
            />
          </div>
        </div>
      )}

      {value.trim() && hasFocus && (
        <div className="absolute z-20 w-[350px] divide-y rounded-b-lg border-x border-b bg-background shadow-xl  overflow-y-auto max-h-[300px] top-12 left-0 mt-1.5 py-2 px-3">
          {!cities.length && <p className="p-3">No results found.</p>}
          {cities.map((teacher) => (
            <button
              key={teacher.id}
              className="block w-full p-1 text-start"
              onClick={() => {
                setvalue(teacher.title!);
                setIsValueSelected(true);
                router.push(`/course/${teacher.id}`);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                setvalue(teacher.title!);
                setIsValueSelected(true);
              }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 p-0.5">
                  <Avatar className="h-8 w-8 ">
                    <AvatarImage
                      className="rounded-full"
                      src={teacher.imageUrl || ""}
                      alt={teacher.title!}
                    />
                    <AvatarFallback className="uppercase">
                      {teacher.title![0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold">{teacher.title}</p>
                  </div>
                </div>
                <div></div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
});
