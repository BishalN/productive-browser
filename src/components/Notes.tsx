import React from "react";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";

export default function Notes() {
  return (
    <div className="flex flex-col justify-center px-2 h-screen space-y-10 rounded-lg border-4 bg-gray-100">
      <h1 className="text-center font-bold bg-white">Productive Browser</h1>
      <h1 className="text-3xl text-center font-bold">
        You're the master of your fate and captain of your soul
      </h1>

      <Button
        className="space-x-2 align-bottom"
        onClick={() => chrome.runtime.openOptionsPage()}
      >
        <ArrowRightIcon />
        <span>Go to home page</span>
      </Button>
    </div>
  );
}
