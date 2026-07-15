"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          password,
        }),

        credentials: "include",
      });

      const data = await response.json();

      // HTTP status check
      if (!response.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      console.log("Signup success:", data);

      // redirect after success
      router.push("/login");

      // clear inputs
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);

      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F5F1] flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-[380px] text-center">
        <div className="font-serif italic font-bold text-[34px] text-[#1A1917] mb-1.5">
          Margin<span className="text-[#B5362A]">al</span>
        </div>
        <p className="text-[13px] text-[#6F6E67] mb-8">
          Create an account to start writing.
        </p>

        <div className="text-left mb-4">
          <label className="block font-mono text-[10.5px] uppercase tracking-wide text-[#6F6E67] mb-1.5">
            Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2.5 border border-[#DEDBD2] rounded-sm bg-white text-sm outline-none focus:border-[#B5362A]"
          />
        </div>

        <div className="text-left mb-4">
          <label className="block font-mono text-[10.5px] uppercase tracking-wide text-[#6F6E67] mb-1.5">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 border border-[#DEDBD2] rounded-sm bg-white text-sm outline-none focus:border-[#B5362A]"
          />
        </div>

        <div className="text-left mb-2">
          <label className="block font-mono text-[10.5px] uppercase tracking-wide text-[#6F6E67] mb-1.5">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2.5 border border-[#DEDBD2] rounded-sm bg-white text-sm outline-none focus:border-[#B5362A]"
          />
        </div>

        {error && (
          <p className="text-[#B5362A] text-[12.5px] mt-3 text-left">{error}</p>
        )}

        <button
          type="submit"
          className="w-full mt-6 bg-[#B5362A] hover:bg-[#93281e] text-white text-sm font-medium py-3 rounded-sm transition-colors"
        >
          Signup
        </button>
      </form>
    </div>
  );
}