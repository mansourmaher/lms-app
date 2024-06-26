import { Cloud, Files, UploadCloud } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

import Dropzone from "react-dropzone";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogContent } from "../ui/dialog";
import { Progress } from "../ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const UploadDropzone = ({ file, onchange }: AccesTeacherProps) => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { startUpload } = useUploadThing("teacherAccess", {
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
    },
  });
  const [processing, setProcessing] = useState(true);

  return (
    <Dropzone
      onDrop={async (acceptedFiles) => {
        setIsUploading(true);

        const res = await startUpload(acceptedFiles);
        if (res) {
          // await axios
          //   .post("/api/teacherAccess", { fileUrl: res[0] })
          //   .then(() => {
          //     setProcessing(false);
          //     toast.success("Your request has been submitted successfully ");
          //   });
          //@ts-ignore
          onchange && onchange(res[0]);
          
           router.refresh();
        }

        setUploadProgress(100);
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <section>
          <div
            {...getRootProps()}
            className="border h-64 m-4 border-dashed border-gray-300 rounded-lg"
          >
            <div className="flex items-center justify-center h-full w-full hover:bg-gray-100">
              <label
                htmlFor="file"
                className="flex flex-col items-center justify-center w-full  hover:bg-gray-100  rounded-lg cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Cloud className="h-6 w-6 text-gray-500" />
                  <p className="text-sm text-gray-500">
                    Drag and drop your file here or{" "}
                    <span className="text-primary">browse</span>
                  </p>
                </div>
                {acceptedFiles && acceptedFiles[0] ? (
                  <div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outiline outline-[1px] outline-primary">
                    <div className="px-3 py-2 h-4 flex flex-row place-items-center">
                      <Files className="h-4 w-4 text-primary" />
                    </div>
                    <div className="px-3 py-2 h-full text-sm truncate">
                      {acceptedFiles[0].name}
                    </div>
                  </div>
                ) : null}
                {isUploading ? (
                  <div className="w-full mt-4 max-w-xs mx-auto ">
                    <Progress
                      value={uploadProgress}
                      className={cn(
                        "h-1",
                        uploadProgress === 100 ? "bg-primary" : "bg-gray-300"
                      )}
                    />
                    <span className="items-center justify-center flex mt-2 text-gray-500">
                      {uploadProgress === 100 && processing ? (
                        <div className=" flex gap-x-2">
                          <p>Uploading</p>
                        </div>
                      ) : (
                        <p>{uploadProgress}% Uploaded </p>
                      )}
                    </span>
                  </div>
                ) : null}
              </label>
              <input {...getInputProps()} />
            </div>
          </div>
        </section>
      )}
    </Dropzone>
  );
};
interface AccesTeacherProps {
  file: File | null;
  onchange?: (file: File) => void;
}
export const AccesTeacher = ({ file, onchange }: AccesTeacherProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // const onSubmit = async (values: any) => {
  //   try {
  //     setIsLoading(true);
  //     await axios.post("/api/teacherAccess", values).then(() => {
  //       toast.success("Your request has been submitted successfully ");
  //     });
  //   } catch (error) {
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <div className="flex gap-x-2 cursor-pointer">
          {" "}
          <span className="text-blue-400">Teacher Acces</span>
          <UploadCloud className="h-6 w-6 text-blue-400" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <UploadDropzone file={file} onchange={onchange} />
        <div className="flex justify-end">
          <Button onClick={() => setIsOpen(false)} className="mr-2">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
