import React from "react";

function Loading() {
  return (
    <div>
      <div className="flex h-screen bg-gray-100 animate-pulse">
        <aside className="w-64 border-r bg-white">
          <div className="overflow-y-auto py-4 px-3">
            <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
            <ul className="space-y-2 mt-3">
              <li>
                <div className="flex items-center space-x-3 text-sm font-medium text-gray-700 rounded-md p-2 hover:bg-gray-100">
                  <div className="h-6 w-6 bg-gray-200 rounded mr-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </li>
              <li>
                <div className="flex items-center space-x-3 text-sm font-medium text-gray-700 rounded-md p-2 hover:bg-gray-100">
                  <div className="h-6 w-6 bg-gray-200 rounded mr-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </li>
            </ul>
          </div>
        </aside>
        <main className="flex-1">
          <div className="border-b p-3">
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
          <div className="p-3">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 bg-gray-200 rounded mr-3"></div>
                <div className="text-sm font-medium">firas</div>
                <div className="text-xs text-gray-500">13 days ago</div>
                <div className="text-sm">I</div>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <span>0 Replies</span>
                  <a className="text-blue-600 hover:underline" href="#">
                    Reply
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
        <aside className="w-64 border-l bg-white">
          <div className="overflow-y-auto py-4 px-3">
            <div className="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
            <ul className="space-y-2 mt-3">
              <li className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gray-200 rounded mr-3"></div>
                <div className="text-sm font-medium">Amino</div>
                <div className="text-xs font-normal text-gray-500">STUDENT</div>
                <div className="text-xs font-normal text-gray-500">1 Posts</div>
              </li>
              <li className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gray-200 rounded mr-3"></div>
                <div className="text-sm font-medium">firas</div>
                <div className="text-xs font-normal text-gray-500">TEACHER</div>
                <div className="text-xs font-normal text-gray-500">3 Posts</div>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Loading;
