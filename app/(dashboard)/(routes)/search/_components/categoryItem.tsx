"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import qs from "query-string";
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSportsMode,
  FcSalesPerformance,
} from "react-icons/fc";
import { Category } from "@prisma/client";
import IconComponent from "./icon-components";

interface CategoryItemProps {
  label: string;

  value: string;
}

export const CategoryItem = ({
  label,

  value,
}: CategoryItemProps) => {
  const iconsMap: Record<Category["name"], IconType> = {
    "Computer Science": FcMultipleDevices,
    Mathematics: FcEngineering,
    Physics: FcOldTimeCamera,
    Chemistry: FcSalesPerformance,
    Biology: FcSportsMode,
    Economics: FcFilmReel,
    Business: FcSalesPerformance,
    Psychology: FcMusic,
    History: FcOldTimeCamera,
  };
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category");
  const currenTitle = searchParams.get("title");

  const isSelected = value === currentCategory;
  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currenTitle,
          category: isSelected ? null : value,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  };
  return (
    <button
      onClick={() => onClick()}
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-700"
      )}
      type="button"
    >
      <IconComponent Icon={iconsMap[label as Category["name"]]} />
      <div className="truncate"> {label}</div>
    </button>
  );
};
