"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [user, setUser] = useState<{
    id: number;
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/current `,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    }

    getUser();
  }, []);

  async function handleLogout() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (res.ok) {
        setUser(null);

        router.push("/login");

        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const navLinks = [
    {
      label: "Feed",
      href: "/blog",
    },
    {
      label: "Explore",
      href: "/explore",
    },
  ];

  return (
    <header className="border-b border-[#DEDBD2] bg-[#F6F5F1]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-baseline gap-2 shrink-0"
        >
          <span className="font-serif italic font-bold text-2xl text-[#1A1917]">
            Margin
            <span className="text-[#B5362A]">
              al
            </span>
          </span>

          <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider text-[#6F6E67]">
            writing, reviewed
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white border border-[#DEDBD2] rounded-full p-1">
          {navLinks.map((link) => {
            const active =
              pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`font-mono text-[11px] uppercase tracking-wide px-4 py-2 rounded-full transition-colors ${
                  active
                    ? "bg-[#1A1917] text-white"
                    : "text-[#6F6E67] hover:text-[#1A1917]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          {user && (
            <Link
              href="/createPost"
              className="text-sm font-medium px-4 py-2 rounded-full bg-[#B5362A] text-white hover:bg-[#93281e]"
            >
              Write
            </Link>
          )}

          {!user ? (
            <>
              <Link
                href="/login"
                className="text-sm font-medium px-4 py-2 rounded-full border border-[#1A1917]"
              >
                Sign in
              </Link>

              <Link
                href="/signup"
                className="text-sm font-medium px-4 py-2 rounded-full bg-[#B5362A] text-white"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="text-sm font-medium px-4 py-2 rounded-full border border-red-500 text-red-600 hover:bg-red-600 hover:text-white transition"
              >
                Logout
              </button>

              <div className="w-9 h-9 rounded-full bg-[#1A1917] text-white flex items-center justify-center font-serif uppercase">
                {user.name.charAt(0)}
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
        >
          <span className="w-5 h-px bg-[#1A1917]" />
          <span className="w-5 h-px bg-[#1A1917]" />
          <span className="w-5 h-px bg-[#1A1917]" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#DEDBD2] px-6 py-4 flex flex-col gap-4 bg-[#F6F5F1]">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`font-mono text-xs uppercase ${
                pathname === link.href
                  ? "text-[#B5362A]"
                  : "text-[#6F6E67]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {user && (
            <Link
              href="/createPost"
              className="text-center rounded-full bg-[#B5362A] text-white py-2"
            >
              Write
            </Link>
          )}

          {!user ? (
            <>
              <Link
                href="/signin"
                className="text-center rounded-full border border-[#1A1917] py-2"
              >
                Sign in
              </Link>

              <Link
                href="/signup"
                className="text-center rounded-full bg-[#B5362A] text-white py-2"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1A1917] text-white flex items-center justify-center uppercase">
                  {user.name.charAt(0)}
                </div>

                <span>{user.name}</span>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-full border border-red-500 text-red-600 py-2"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}