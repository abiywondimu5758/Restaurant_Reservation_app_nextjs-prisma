import React from "react";
import Header from "./components/Header";

export default function Loading() {
  return (
    <main>
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        <div className="animate-pulse bg-slate-200 w-64 h-72 rounded overflow-hidden border cursor-pointer"></div>
      </div>
    </main>
  );
}
