import * as React from "react";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
}

export function DataFilterByWeek<TData, TValue>({
  column,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const filterValue = (column?.getFilterValue() as string[]) ?? [];
  const selectedValues = new Set(filterValue.map((value) => String(value)));
  console.log(filterValue, selectedValues, facets)
  const onFilterChange = (value: string) => {
    if (selectedValues.has(value)) {
      selectedValues.delete(value);
    } else {
      selectedValues.add(value);
    }
    const filterValues = Array.from(selectedValues);
    column?.setFilterValue(filterValues.length ? filterValues : undefined);
  }
  const week = [
    { title: "this week", icon: null, value: "this week" },
    { title: "last week", icon: null, value: "last week" },
    { title: "2 weeks ago", icon: null, value: "2 weeks ago" },
    { title: "3 weeks ago", icon: null, value: "3 weeks ago" },
    { title: "4 weeks ago", icon: null, value: "4 weeks ago" },
    { title: "5 weeks ago", icon: null, value: "5 weeks ago" },
    { title: "6 weeks ago", icon: null, value: "6 weeks ago" },
    { title: "7 weeks ago", icon: null, value: "7 weeks ago" },
    { title: "8 weeks ago", icon: null, value: "8 weeks ago" },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          which week do you want to filter by
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  week
                    // @ts-ignore
                    .filter((option) => selectedValues.has(option.title))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        // @ts-ignore
                        key={option.title}
                        className="rounded-sm px-1 font-normal"
                      >
                        {/** @ts-ignore */}
                        {option.title}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Wich Week" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {week.map((option) => {
                {
                  /** @ts-ignore */

                }
                const isSelected = selectedValues.has(option.title);
                return (
                  <CommandItem
                    // @ts-ignore
                    key={option.title}
                    onSelect={() => {
                      if (isSelected) {
                        {
                          /** @ts-ignore */
                        }
                        selectedValues.delete(option.title);
                      } else {
                        {
                          /** @ts-ignore */
                        }
                        selectedValues.add(option.title);
                        alert(option.title);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      );
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    {/* {option.icon && (
                    //   <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )} */}
                    {/** @ts-ignore */}
                    <span>{option.title}</span>
                    {/** @ts-ignore */}
                    {facets?.get(option.title) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {/** @ts-ignore */}
                        {facets.get(option.title)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
