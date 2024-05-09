"use client";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { Input } from "./ui/input";
import { getTeacherWithCoursesCount } from "@/actions/Etudiant/get-teacher-name";
import qs from "query-string";
import { usePathname, useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Search } from "lucide-react";

interface valueProps extends React.InputHTMLAttributes<HTMLInputElement> {
  teachers: Awaited<ReturnType<typeof getTeacherWithCoursesCount>>;
}

export default forwardRef<HTMLInputElement, valueProps>(function value(
  { teachers, ...props },
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
          teacher: value,
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

    return teachers

      .filter(
        (teacher) =>
          teacher.user?.name
            ?.toLowerCase()
            .startsWith(searchWords[0].toLowerCase()) &&
          searchWords.every((word) =>
            teacher.user?.name?.toLowerCase().includes(word.toLowerCase())
          )
      )
      .slice(0, 5);
  }, [value]);

  const issearchPage = pathname?.includes("/search");

  return (
    <div className="w-full max-w-2xl px-4 relative">
      <div className="relative w-[300px]">
        <div className="flex w-full">
          <Input
            placeholder="Search for a teacher..."
            type="search"
            value={value}
            onChange={(e) => setvalue(e.target.value)}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
            className="border-none bg-transparent w-full pl-11 rounded-full focus-visible:ring-slate-200"
            {...props}
            ref={ref}
          />
        </div>
      </div>

      {value.trim() && hasFocus && (
        <div className="absolute z-20 w-[350px] divide-y rounded-b-lg border-x border-b bg-background shadow-xl  overflow-y-auto max-h-[300px] top-12 left-0 mt-1.5 py-2 px-3">
          {!cities.length && <p className="p-3">No results found.</p>}
          {cities.map((teacher) => (
            <button
              key={teacher.user?.id}
              className="block w-full p-1 text-start"
              onClick={() => {
                router.push(`/teachers/${teacher.user?.id}`);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                setvalue(teacher.user?.name!);
                setIsValueSelected(true);
              }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 p-0.5">
                  <Avatar className="h-8 w-8 ">
                    <AvatarImage
                      className="rounded-full"
                      src={teacher.user?.image || ""}
                      alt={teacher.user?.name!}
                    />
                    <AvatarFallback className="uppercase">
                      {teacher.user?.name![0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold">
                      {teacher.user?.name}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {teacher.coursesCount == 1
                      ? `${teacher.coursesCount} course`
                      : `${teacher.coursesCount} courses`}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
});
