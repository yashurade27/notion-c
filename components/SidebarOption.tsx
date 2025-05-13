"use client";
import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

const SidebarOption = ({ href, id }: { href: string; id: string }) => {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const pathname = usePathname();
  const isActive = href.includes(pathname) && pathname !== "/";

  if (!data) return null;

  return (
    <div>
      <Link
        href={href}
        className={`block px-4 py-2 rounded-md border-1 transition-all duration-200 truncate ${
          isActive
            ? "bg-gray-200 font-semibold border-gray-700 text-black"
            : "border-gray-300 hover:bg-gray-100"
        }`}
      >
        {data.title}
      </Link>
    </div>
  );
};

export default SidebarOption;
