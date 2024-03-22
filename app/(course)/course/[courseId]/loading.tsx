import React from "react";

export default function Loading() {
  return (
    <div className="m-8">
      <nav
        aria-label="Breadcrumb"
        className="text-sm font-medium text-blue-600 animate-pulse"
      >
        <ol className="flex space-x-2">
          <li>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </li>
          <li>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
          </li>
          <li>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </li>
          <li>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
          </li>
          <li aria-current="page" className="text-blue-800">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </li>
        </ol>
      </nav>
      <div className="mt-16">
        <div className="h-[500px] w-full bg-gray-200 rounded animate-pulse"></div>
        <div>
          <div className="flex space-x-2 bg-white p-2 rounded-lg shadow-md animate-pulse">
            <div className="h-10 bg-gray-200 rounded-lg w-20"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-40"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
