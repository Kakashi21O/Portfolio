
"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar/Navbar";

export function ConditionalNavbar() {
  const pathname = usePathname();

  if (pathname.startsWith("/certificates")) {
    return <Navbar minimal />;
  }

  return <Navbar minimal={pathname.startsWith("/certificates")} />;
}
