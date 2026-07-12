"use client";

import { useState } from "react";

export default function CommentForm({
  postId,
  onCommentAdded,
}: {
  postId: number;
  onCommentAdded: () => void;
}) {

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleSubmit() {

    if (!text.trim()) return;


    setLoading(true);


    const res = await fetch(
      `http://localhost:5000/api/comments`,
      {
        method:"POST",

        credentials:"include",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          text,
          postId
        })
      }
    );


    const data = await res.json();

    console.log(data);


    setText("");

    setLoading(false);


    if(res.ok){
      onCommentAdded();
    }

  }


  return (

    <div className="mt-8">


      <textarea

        className="border rounded p-3 w-full"

        placeholder="Write a comment..."

        value={text}

        onChange={(e)=>setText(e.target.value)}

      />


      <button

        onClick={handleSubmit}

        disabled={loading}

        className="mt-3 border px-5 py-2 rounded"

      >

        {
          loading 
          ?
          "Posting..."
          :
          "Comment"
        }

      </button>


    </div>

  )
}