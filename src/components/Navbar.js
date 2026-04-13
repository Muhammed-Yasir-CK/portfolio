"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-all duration-300">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-cover transform transition-transform group-hover:scale-110" />
              </div>
              <span className="text-sm md:text-base font-bold tracking-wider uppercase bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent transition-all duration-300 group-hover:tracking-widest">
                Muhammed Yasir CK
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/#about" className="hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">About</Link>
              <Link href="/#education" className="hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Education</Link>
              <Link href="/#skills" className="hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Skills</Link>
              <Link href="/#projects" className="hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Projects</Link>
              {/* <Link href="/#blog" className="hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Blog</Link> */}
              <Link href="/#contact" className="hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
