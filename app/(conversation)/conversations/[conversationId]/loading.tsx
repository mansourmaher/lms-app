import React from "react";

function Loading() {
  return (
    <div>
      <div className="flex h-screen">
        <main className="flex-1 animate-pulse">
          <header className="bg-white shadow-sm p-5 flex items-center justify-between">
            <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
          </header>
          <div className="flex flex-col justify-between h-full space-y-8">
            <div className="p-5 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="h-8 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-5 w-20 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="h-8 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-5 w-20 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="h-8 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-5 w-20 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="h-8 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-5 w-20 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="h-8 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-5 w-20 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="h-8 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-5 w-20 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="h-8 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-5 w-20 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="h-8 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-5 w-20 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="bg-white p-5">
              <div className="border rounded-full h-6 py-2 px-4 w-full"></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Loading;
