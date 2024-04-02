"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { set } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TitleFormProps {
  initialeData: {
    target: string[];
  };
  courseId: any;
}
export const TargetForm = ({ initialeData, courseId }: TitleFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [options, setOptions] = useState(initialeData.target);
  const [target, setTarget] = useState("");
  const onAddOption = (option: string) => {
    setOptions([...options, option]);
  };
  const handelremove = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async () => {
    try {
      await axios.patch(`/api/courses/${courseId}`, { target: options });
      toast.success("target updated");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        target form
        <Button variant="ghost" onClick={toggleEditing}>
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit target
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-x-4">
              <span className="flex gap-x-2 items-center">
                {index + 1})
                <span className="text-gray-700 whitespace-normal break-all">
                  {option}
                </span>
              </span>
            </div>
          ))}
        </div>
      )}
      {isEditing && (
        <Input
          type="text"
          placeholder="Add target"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onAddOption(e.currentTarget.value);
              e.currentTarget.value = "";
              setTarget("");
            }
          }}
        />
      )}
      {isEditing && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-x-2">
              <span>
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger onDoubleClick={() => handelremove(index)}>
                      <span className=" p-2 relative text-gray-700 whitespace-normal break-all">
                        {index + 1}) {" "} {option}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Double click to remove</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
            </div>
          ))}
        </div>
      )}
      {isEditing && (
        <div className="flex items-center gap-x-2">
          <Button
            type="button"
            size={"sm"}
            disabled={options.length === 0}
            className="mt-4 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            onClick={onSubmit}
          >
            Save
          </Button>
          <Button
            type="button"
            size={"sm"}
            disabled={target === ""}
            className="mt-4 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            onClick={() => {
              onAddOption(target);
              setTarget("");
            }}
          >
            Add target
          </Button>
        </div>
      )}
    </div>
  );
};
export default TargetForm;
