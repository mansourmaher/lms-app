import React from "react";

export default function Loading() {
  return (
    <div className="m-8">
      <div className="bg-white animate-pulse">
        <nav className="bg-gray-100 p-4">
          <ol className="list-reset flex text-grey-dark">
            <li>
              <div className="rounded bg-gray-200 w-1/6 h-4"></div>
            </li>
            <li>
              <span className="mx-2"></span>
            </li>
            <li>
              <div className="rounded bg-gray-200 w-1/6 h-4"></div>
            </li>
            <li>
              <span className="mx-2"></span>
            </li>
            <li>
              <div className="rounded bg-gray-200 w-1/3 h-4"></div>
            </li>
          </ol>
        </nav>
        <div className=" rounded bg-gray-200 h-6 mb-2"></div>
        <div className="relative">
          <div className="rounded bg-gray-200 w-full h-20 mb-2"></div>
          <div className="absolute bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.5)] p-4 text-white">
            <div className="h-6 bg-gray-200 rounded mb-2 w-5/6"></div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex space-x-1 rounded bg-gray-200 h-10"></div>
          <div className="mt-6">
            <div className="h-6 bg-gray-200 rounded"></div>
            <div className="mt-2 rounded bg-gray-200 w-full h-20"></div>
            <div className="flex items-center mt-4">
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
              <div className="w-6 h-6 bg-gray-200 rounded ml-1"></div>
              <div className="w-6 h-6 bg-gray-200 rounded ml-1"></div>
              <div className="w-6 h-6 bg-gray-200 rounded ml-1"></div>
              <div className="w-6 h-6 bg-gray-200 rounded ml-1"></div>
              <div className="font-semibold text-gray-600 rounded bg-gray-200 h-4 w-24 ml-2"></div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div>
                <div className="rounded bg-gray-200 w-full h-6"></div>
                <div className="flex items-center mt-2">
                  <div className="rounded bg-gray-200 h-6 w-6"></div>
                  <div className="rounded bg-gray-200 h-6 w-24 ml-2"></div>
                </div>
              </div>
              <div>
                <div className="rounded bg-gray-200 w-full h-6"></div>
                <div className="flex items-center mt-2">
                  <div className="rounded bg-gray-200 h-6 w-6"></div>
                  <div className="rounded bg-gray-200 h-6 w-24 ml-2"></div>
                </div>
              </div>
              <div>
                <div className="rounded bg-gray-200 w-full h-6"></div>
                <div className="flex items-center mt-2">
                  <div className="rounded bg-gray-200 h-6 w-6"></div>
                  <div className="rounded bg-gray-200 h-6 w-24 ml-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
