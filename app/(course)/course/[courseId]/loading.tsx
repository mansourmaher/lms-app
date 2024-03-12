import React from "react";

export default function Loading() {
  return (
    <div>
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 px-4 py-2"></div>
        <div className="text-2xl font-bold h-6 bg-gray-200 rounded w-3/4 mx-8 my-3"></div>
        <div className="h-full w-full rounded-lg my-3 bg-gray-200"></div>
        <div className="h-4 my-3 bg-gray-200 rounded w-full mx-8"></div>
        <div className="flex flex-row justify-between items-center m-6 mr-16">
          <div className="mb-6 h-10 bg-gray-200 rounded"></div>
          <div className="mb-6 h-10 bg-gray-200 rounded"></div>
          <div className="mb-6 h-10 bg-gray-200 rounded"></div>
        </div>
        <div className="w-full p-4">
          <div className="flex items-start space-x-4">
            <div className="rounded-full h-12 w-12 bg-gray-200"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 mt-2 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="flex">
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="mt-2 h-4 bg-gray-200 rounded w-full"></div>
              <div className="md:flex md:flex-row md:justify-between md:items-center flex flex-col space-y-2">
                <div className="md:flex flex-row md:space-x-6 mt-6 md:items-center">
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
