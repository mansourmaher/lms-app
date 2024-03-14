import React from "react";

export default function Loading() {
  return (
    <div className="m-8">
      <div className="bg-white animate-pulse">
        <nav className="bg-gray-100 p-4">
          <ul className="flex space-x-4">
            <li>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </li>
            <li>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </li>
            <li>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </li>
          </ul>
        </nav>
        <header className="bg-blue-200 p-4">
          <div className="h-8 bg-gray-200 rounded w-full"></div>
        </header>
        <div className="relative">
          <div className="h-40 bg-gray-200 rounded w-full"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-25" />
          <div className="absolute bottom-0 left-0 p-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="mt-2 h-8 bg-gray-200 rounded w-11/12"></div>
            <div className="mt-2 h-8 bg-gray-200 rounded w-full"></div>
            <div className="mt-2 h-8 bg-gray-200 rounded w-11/12"></div>
          </div>
        </div>
        <div className="flex justify-between p-4">
          <div className="h-6 bg-gray-200 rounded w-40"></div>
          <div className="h-6 bg-gray-200 rounded w-24"></div>
          <div className="h-6 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="flex justify-between items-center p-4 border-t border-gray-300">
          <div className="w-1/3 h-24 bg-gray-200"></div>
          <div className="h-16 w-2/5 bg-gray-200"></div>
        </div>
        <div className="flex space-x-4 p-4">
          <div className="h-10 w-24 bg-gray-200 rounded"></div>
          <div className="h-10 w-36 bg-gray-200 rounded"></div>
          <div className="h-10 w-56 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
