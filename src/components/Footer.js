"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-black/80 border-t border-white/10 py-8 text-center text-sm text-gray-400 mt-auto">
      <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
}
