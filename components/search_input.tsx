"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import qs from "query-string";


export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentCategory = searchParams.get("category");
  const [teacher, setTeacher] = useState("");
  const [open, setOpen] = useState(false);
  const [valuee, setValuee] = useState("");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: debouncedValue,
          category: currentCategory,
          teacher: teacher,
          level: searchParams.get("level"),
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [debouncedValue, currentCategory, pathname, router, teacher]);

  return (
    <div className="flex relative max-w-[500px] md:w[500px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-slate-500" />
      <div className="flex w-full">
        <Input
          placeholder="Search for courses"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};
