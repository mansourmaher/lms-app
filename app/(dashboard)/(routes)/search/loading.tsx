import React from "react";

export default function Loading() {
  return (
    <div className="mx-16">
      <div className="flex gap-8 m-6 ">
        {new Array(10).fill(0).map((_, i) => (
          <div
            key={i}
           
          >
            <div className="py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 animate-pulse">
              <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
              <div className="h-4 w-16 bg-gray-300 rounded-full"></div>
              
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3  gap-8 mt-12">
        {new Array(6).fill(0).map((_, i) => (
          <div
            key={i}
            className="p-4 bg-gray-200 animate-pulse flex flex-col border rounded-lg">
          <div className="p-4 bg-gray-200 animate-pulse flex flex-col border rounded-lg">
            <div className="relative w-full aspect-w-16 aspect-h-9 rounded-xl mb-4">
              <div className="absolute inset-0 bg-gray-300 rounded-xl"></div>
            </div>
            <hr className="border-t border-gray-300 mb-2" />

            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
            <div className="px-2">
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex ">
                <div className="h-4 bg-gray-300 rounded w-20 mx-2"></div>
              </div>
              <div className="-mx-1">
                <div className="h-4 bg-gray-300 rounded w-24"></div>
              </div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>

            <div className="flex justify-between items-center">
              <div className="mt-6 ">
                <div className="h-10 bg-gray-300 rounded"></div>
              </div>
              <div className="mt-6 ">
                <div className="h-10 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}
