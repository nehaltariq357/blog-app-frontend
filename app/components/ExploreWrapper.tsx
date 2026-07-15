import SearchBar from "./SearchBar";
import LatestBlogs from "./LatestBlogs";
import TrendingBlogs from "./TrendingBlogs";

export default function ExploreWrapper() {
  return (
    <div className="min-h-screen bg-[#F6F5F1]">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Heading */}
        <div className="mb-10 pb-8 border-b border-[#DEDBD2]">
          <span className="inline-block font-mono text-[10.5px] uppercase tracking-wider text-[#B5362A] border border-[#B5362A] rounded-sm px-2 py-1 -rotate-2 mb-4">
            Explore
          </span>

          <h1 className="font-serif font-bold text-4xl text-[#1A1917]">
            Explore Blogs
          </h1>

          <p className="text-[#6F6E67] text-sm mt-2">
            Discover the latest articles, trending posts and search anything.
          </p>
        </div>

        {/* Search */}
        <SearchBar />

        {/* Latest */}
        <div className="mt-14">
          <LatestBlogs />
        </div>

        {/* Trending */}
        <div className="mt-14">
          <TrendingBlogs />
        </div>
      </div>
    </div>
  );
}