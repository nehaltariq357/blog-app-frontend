"use client";

import { useState } from "react";
import TiptapEditor from "../components/TiptapEditor";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async () => {
    await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content, // HTML string
      }),
      credentials: "include", // Include cookies in the request
    });
    
  };

  return (
    <div>
      <h1>Create Post</h1>
      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <h1>Content</h1>
      <TiptapEditor content={content} onChange={setContent} />

      <button onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
}