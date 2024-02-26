import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";
import { useToast } from "@/components/ui/use-toast";

interface FileUploadProps {
  onChange: (url: string) => void;
  endpoint: keyof typeof ourFileRouter;
  onClientUploadComplete?: (res: any) => void;
  onUploadStart?: (file: any) => void;
  onUploadBegin?: (file: any) => void;
}

export const FileUpload = ({
  onChange,
  endpoint,
  onUploadBegin,
  onClientUploadComplete,
}: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onUploadBegin={(file: any) => {
        if (onUploadBegin) {
          onUploadBegin(file);
        }
        toast.loading("start Uploading file");
      }}
      onClientUploadComplete={(res: any) => {
        onChange(res?.[0].url);
        toast.dismiss(); // Corrected: Invoking the toast.dismiss() function
        if (onClientUploadComplete) {
          onClientUploadComplete(res);
        }
      }}
      onUploadError={(error: any) => {
        toast.error(error.message);
      }}
    />
  );
};
