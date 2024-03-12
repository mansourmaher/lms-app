"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryItemProps {
  label: string;
  icon?: IconType;
  value: string;
}

export const CategoryItem = ({
  label,
  icon: Icon,
  value,
}: CategoryItemProps) => {
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
      {Icon && <Icon size={20} />}
      <div className="truncate"> {label}</div>
    </button>
  );
};
