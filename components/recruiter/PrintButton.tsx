"use client";

import { LuPrinter } from "react-icons/lu";
import { buttonClass } from "@/components/ui";

export default function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className={buttonClass("secondary")}>
      <LuPrinter className="h-4 w-4" aria-hidden="true" />
      Print / save as PDF
    </button>
  );
}
