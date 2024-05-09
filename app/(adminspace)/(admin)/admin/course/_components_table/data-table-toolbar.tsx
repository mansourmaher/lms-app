"use client";

import { Input } from "@/components/ui/input";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./data-table-facedted.filter";
import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "./data-table-view-options";
import { labels, priorities, statuses, statuses2 } from "./data/data";
import { getCourseIncludeProgresse } from "@/actions/teacher/get-all-course-include-progresse";
import React, { useEffect } from "react";
import { any } from "zod";
import { getCoursesName } from "@/actions/teacher/get-courses-name";
import { DataCoursesFilter } from "./data-table-course-filter";
import { DataFilterByWeek } from "./data-table-filter-by-date";
import { getCategoryName } from "@/actions/admin/getcategoryName";

interface DataTableToolbarProps<TData> {
  table: Table<Awaited<ReturnType<typeof getCourseIncludeProgresse>>>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [categories, setCategories] = React.useState([] as any);
  useEffect(() => {
    const fetchData = async () => {
      const courses = await getCategoryName();
      setCategories(courses);
      
    };
    fetchData();
  }, [table]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search a specific course"
          value={
            (table.getColumn("Course Title")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("Course Title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("Category") && (
          <DataTableFacetedFilter
            column={table.getColumn("Category")}
            title="Category"
            options2={categories.map((category: any) => ({
              label: category.name,
              value: category.name,
            }))}
          />
        )}

        {/* {table.getColumn("Category") && (
          <DataCoursesFilter
            column={table.getColumn("course_title")}
            title="Courses"
            options2={labels}
          />
        )}  */}
        {/* <DataFilterByWeek column={table.getColumn("created_at")} /> */}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
