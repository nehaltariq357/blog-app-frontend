"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Marginal design system — drop this into your Next.js layout.
// Fonts (add to your root layout / _document or globals.css):
//   Source Serif 4  -> logo + headings
//   IBM Plex Mono   -> nav labels / metadata
// If you don't want to load these fonts yet, the classes below fall back
// to serif / mono system fonts, so it still looks right out of the box.

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Feed", href: "/blog" },
    { label: "Explore", href: "/explore" },
  ];

  return (
    <header className="border-b border-[#DEDBD2] bg-[#F6F5F1]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-baseline gap-2 shrink-0">
          <span className="font-serif italic font-bold text-2xl text-[#1A1917]">
            Margin<span className="text-[#B5362A]">al</span>
          </span>
          <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider text-[#6F6E67]">
            writing, reviewed
          </span>
        </a>

        {/* Center nav — desktop */}
        <nav className="hidden md:flex items-center gap-1 bg-white border border-[#DEDBD2] rounded-full p-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`font-mono text-[11px] uppercase tracking-wide px-4 py-2 rounded-full transition-colors ${
                  isActive
                    ? "bg-[#1A1917] text-[#F6F5F1]"
                    : "text-[#6F6E67] hover:text-[#1A1917]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right actions — desktop */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/write"
            className="text-sm font-medium px-4 py-2 rounded-full bg-[#B5362A] text-white hover:bg-[#93281e] transition-colors"
          >
            Write
          </a>
          <a
            href="/signin"
            className="text-sm font-medium px-4 py-2 rounded-full border border-[#1A1917] text-[#1A1917] hover:bg-[#1A1917] hover:text-[#F6F5F1] transition-colors"
          >
            Sign in
          </a>
          {/* Swap this block in once auth state exists, e.g.:
              {user ? <Avatar user={user} /> : <SignInButton />} */}
          <div className="w-9 h-9 rounded-full bg-[#1A1917] text-[#F6F5F1] flex items-center justify-center font-serif text-sm">
            A
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className="w-5 h-px bg-[#1A1917]" />
          <span className="w-5 h-px bg-[#1A1917]" />
          <span className="w-5 h-px bg-[#1A1917]" />
        </button>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#DEDBD2] px-6 py-4 flex flex-col gap-3 bg-[#F6F5F1]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`font-mono text-xs uppercase tracking-wide ${
                  isActive ? "text-[#B5362A]" : "text-[#6F6E67]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="flex gap-3 pt-2">
            <a
              href="/write"
              className="flex-1 text-center text-sm font-medium px-4 py-2 rounded-full bg-[#B5362A] text-white"
            >
              Write
            </a>
            <a
              href="/signin"
              className="flex-1 text-center text-sm font-medium px-4 py-2 rounded-full border border-[#1A1917] text-[#1A1917]"
            >
              Sign in
            </a>
          </div>
        </div>
      )}
    </header>
  );
}