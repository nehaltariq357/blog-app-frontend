"use client";

import { useEffect, useState } from "react";
import SearchResults from "./SearchResults";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Empty search
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/posts/search?q=${encodeURIComponent(query)}`
        );

        const data = await res.json();

        console.log("data", data);

        setResults(data);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search blogs…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border border-[#DEDBD2] rounded-full px-5 py-3 text-sm bg-white text-[#1A1917] placeholder:text-[#9a988f] outline-none focus:border-[#B5362A]"
      />

      {loading && (
        <p className="mt-2 font-mono text-[11px] uppercase tracking-wide text-[#B5362A]">
          Searching…
        </p>
      )}

      {loading && (
        <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-[#B5362A]">
          Searching…
        </p>
      )}

      {!loading && <SearchResults posts={results} />}
    </div>
  );
}