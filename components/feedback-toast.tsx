import { BellIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

export default function Fedbacktoast() {
  return (
    <div>
      {" "}
      {/* i want when i have a see some anmation  */}
      <aside className="fixed inset-y-0 z-50 flex flex-col justify-end gap-4 right-1 pointer-events-none mb-6 ">
        <div>
          <aside className="rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md p-4 max-w-sm w-full pointer-events-auto">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="">
                  <h6 className="text-sm font-semibold mb-2">Heads up!</h6>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {/* is for feedback */}
                    We've made some changes to the way feedback is handled.{" "}
                    <a href="#" className="text-primary hover:underline">
                      Learn more
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div></div>
                <div className="flex gap-x-4 ">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ask me later
                  </p>
                  <Button size="sm" variant="outline">
                    Dont show again
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </aside>
    </div>
  );
}
