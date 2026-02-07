"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 transition-opacity duration-200 hover:opacity-80"
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-lg shadow-md">
              <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>

            {/* Brand Name */}
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-800 tracking-tight">
                EduSlide AI
              </span>
              <span className="text-[10px] font-medium text-indigo-600 -mt-1 tracking-wider uppercase">
                Smart Learning
              </span>
            </div>
          </Link>

        </div>
      </div>
    </nav>
  );
}
