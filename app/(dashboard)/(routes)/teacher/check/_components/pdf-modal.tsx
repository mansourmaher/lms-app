"use client";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useResizeDetector } from "react-resize-detector";
import { ChevronDown, ChevronUp, Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import PdfModalFullScreen from "./pdfModal-full-screen";
import PdfNote from "./pdf-note";

interface PdfModalProps {
  info: any;
  work: any;
  id: any;
}

export default function PdfModal({ info, work,id }: PdfModalProps) {
  const { width, ref } = useResizeDetector();
  const [numPages, setNumPages] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [scale, setScale] = React.useState(1);
  const [renderedScale, setRenderedScale] = useState<number | null>(null);
  const isLoading = renderedScale !== scale;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex space-x-2 items-center cursor-pointer">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-x-2"
          >
            <div className="flex gap-x-2">
              <svg
                fill="none"
                aria-hidden="true"
                className="w-5 h-5 flex-shrink-0"
                viewBox="0 0 20 21"
              >
                <g clipPath="url(#clip0_3173_1381)">
                  <path
                    fill="#E2E5E7"
                    d="M5.024.5c-.688 0-1.25.563-1.25 1.25v17.5c0 .688.562 1.25 1.25 1.25h12.5c.687 0 1.25-.563 1.25-1.25V5.5l-5-5h-8.75z"
                  />
                  <path
                    fill="#B0B7BD"
                    d="M15.024 5.5h3.75l-5-5v3.75c0 .688.562 1.25 1.25 1.25z"
                  />
                  <path fill="#CAD1D8" d="M18.774 9.25l-3.75-3.75h3.75v3.75z" />
                  <path
                    fill="#F15642"
                    d="M16.274 16.75a.627.627 0 01-.625.625H1.899a.627.627 0 01-.625-.625V10.5c0-.344.281-.625.625-.625h13.75c.344 0 .625.281.625.625v6.25z"
                  />
                  <path
                    fill="#fff"
                    d="M3.998 12.342c0-.165.13-.345.34-.345h1.154c.65 0 1.235.435 1.235 1.269 0 .79-.585 1.23-1.235 1.23h-.834v.66c0 .22-.14.344-.32.344a.337.337 0 01-.34-.344v-2.814zm.66.284v1.245h.834c.335 0 .6-.295.6-.605 0-.35-.265-.64-.6-.64h-.834zM7.706 15.5c-.165 0-.345-.09-.345-.31v-2.838c0-.18.18-.31.345-.31H8.85c2.284 0 2.234 3.458.045 3.458h-1.19zm.315-2.848v2.239h.83c1.349 0 1.409-2.24 0-2.24h-.83zM11.894 13.486h1.274c.18 0 .36.18.36.355 0 .165-.18.3-.36.3h-1.274v1.049c0 .175-.124.31-.3.31-.22 0-.354-.135-.354-.31v-2.839c0-.18.135-.31.355-.31h1.754c.22 0 .35.13.35.31 0 .16-.13.34-.35.34h-1.455v.795z"
                  />
                  <path
                    fill="#CAD1D8"
                    d="M15.649 17.375H3.774V18h11.875a.627.627 0 00.625-.625v-.625a.627.627 0 01-.625.625z"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3173_1381">
                    <path
                      fill="#fff"
                      d="M0 0h20v20H0z"
                      transform="translate(0 .5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <p>{work}</p>
            </div>
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[1080px]">
        <AlertDialogHeader>
          <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
            <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-4">
              <div className="flex items-center gap-1.5">
                <Button
                  onClick={() => {
                    setCurrentPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
                  }}
                  variant="ghost"
                  aria-label="previous page"
                >
                  <ChevronDown className="w-5 h-5" />
                </Button>
                <div className="flex items-center gap-2">
                  <Input className="w-12 h-8" value={currentPage}></Input>
                  <p className="text-sm text-zinc-500">
                    <span>/</span>
                    <span>{numPages}</span>
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setCurrentPage((prev) =>
                      prev + 1 < numPages ? prev + 1 : numPages
                    );
                  }}
                  variant="ghost"
                  aria-label="next page"
                >
                  <ChevronUp className="w-5 h-5 transform rotate-180" />
                </Button>
              </div>
              <PdfNote id={id} />
              <div className="space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="gap-1.5"
                      aria-label="zoom"
                      variant="ghost"
                    >
                      <Search className="h-4 w-4" />
                      {scale * 100}%
                      <ChevronDown className="h-3 w-3 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onSelect={() => setScale(1)}>
                      100%
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setScale(0.5)}>
                      150%
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setScale(2)}>
                      200%
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setScale(1.01)}>
                      250%
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <PdfModalFullScreen fileUrl={info} />
            </div>
          </div>
        </AlertDialogHeader>
        <div ref={ref}>
          <Document
            file={info}
            className="max-h-full"
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {isLoading && renderedScale ? (
              <Page
                width={width ? width : 1}
                pageNumber={currentPage}
                scale={scale}
                key={"@" + renderedScale}
              />
            ) : null}
            <Page
              className={cn(isLoading ? "hidden" : "")}
              width={width ? width : 1}
              pageNumber={currentPage}
              scale={scale}
              key={"@" + scale}
              loading={
                <div className="flex justify-center">
                  <Loader2 className="my-24 h-6 w-6 animate-spin" />
                </div>
              }
              onRenderSuccess={() => setRenderedScale(scale)}
            />
          </Document>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
