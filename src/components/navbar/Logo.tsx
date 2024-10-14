import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Link href="/" className="text-2xl font-bold text-gray-800">
        OutVentures
      </Link>
    </div>
  );
}
