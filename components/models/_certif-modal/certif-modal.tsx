"use client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "react-day-picker";

export default function CertifModal() {
  const ref = useRef(null);
  const handelDownload = () => {
    console.log(ref.current!);
    html2canvas(ref.current!).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l","mm",[1000,670])
      pdf.addImage(imageData, "PNG", 0, 0, 1000, 667);
      pdf.save("download.pdf");
    });
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button>Open Dialog</button>
        </DialogTrigger>
        <div>
          <DialogContent className="max-w-5xl max-h-7xl w-full mt-0" ref={ref}>
            <span
              className="absolute top-0 right-0 bg-red-600 text-white cursor-pointer"
              onClick={handelDownload}
            >
              donwlod
            </span>
            <div className="flex justify-center items-center max-w-5xl   ">
              <img
                src="/cadre.jpg"
                className="w-full h-full object-cover"
                alt="first"
                loading="lazy"
              />
            </div>
            <div className="flex justify-center items-center ">
              <div className="">
                <h1 className="text-3xl font-bold text-center mt-12">
                  CERTIFICATE OF APPRECIATION
                </h1>
                <p className="text-center mt-4">
                  This certificate is proudly presented to
                </p>
                <h2 className="text-xl font-semibold text-center my-4">
                  [Recipient Name]
                </h2>
                <p className="text-center text-sm">
                  the company confirms that [Recipient Name] successfully
                  completed [Course Duration] of [Course Name] on [Completion
                  Date]
                </p>
                <div className="flex justify-between items-center mt-8">
                  <div className="flex flex-col items-center">
                    <hr className="w-32 border-t-2 border-zinc-300" />
                    <span className="text-sm mt-2">DATE</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <hr className="w-32 border-t-2 border-zinc-300" />
                    <span className="text-sm mt-2">SIGNATURE</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mt-8 mb-12">
                  [Company Name]
                </h3>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-r from-gold-400 to-gold-300"></div>
              </div>
            </div>
            <div className="flex justify-center items-center max-w-5xl   ">
              <img
                src="/louta.png"
                className="w-full h-full object-cover"
                alt="first"
                loading="lazy"
              />
            </div>
          </DialogContent>
        </div>
        <DialogFooter>
          <div className=" bg-red-600 cursor-pointer">
            <span
              className="text-white cursor-pointer"
              onClick={handelDownload}
            >
              download
            </span>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
