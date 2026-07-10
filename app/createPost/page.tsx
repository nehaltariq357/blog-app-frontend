"use client";

import {useState} from "react";
import TiptapEditor from "../components/TiptapEditor";
import {useRouter} from "next/navigation";


export default function CreatePost(){

const router = useRouter();

const [title,setTitle] = useState("");
const [content,setContent] = useState("");



const handleSubmit = async()=>{


console.log({
 title,
 content
});


const res = await fetch(
"http://localhost:5000/api/posts",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

credentials:"include",

body:JSON.stringify({

title,
content,
visibility:"PUBLIC"

})

});


const data = await res.json();


console.log(data);


if(res.ok){
 router.push(`/blog/${data.id}`);
}


}



return (

<div className="max-w-3xl mx-auto">


<h1 className="text-3xl">
Create Blog
</h1>


<input

className="border p-2 w-full"

placeholder="Blog title"

value={title}

onChange={(e)=>setTitle(e.target.value)}

/>



<TiptapEditor

content={content}

onChange={setContent}

/>



<button

onClick={handleSubmit}

className="mt-4 border px-5 py-2"

>
Publish
</button>


</div>

)

}