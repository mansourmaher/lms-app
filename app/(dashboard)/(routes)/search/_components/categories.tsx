import { Category } from "@prisma/client";

import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSportsMode,
  FcSalesPerformance,
} from "react-icons/fc";
import { IconType } from "react-icons";
import { CategoryItem } from "./categoryItem";
import { db } from "@/lib/db";

interface CategoriesProps {
  items: Category[];
}

export const Categories = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <div className="flex items-center gap-x-2 overflow-auto pb-2">
      {categories.map((item) => (
        <CategoryItem key={item.id} label={item.name} value={item.id} />
      ))}
    </div>
  );
};
