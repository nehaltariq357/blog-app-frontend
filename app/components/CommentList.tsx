"use client";


import {useEffect,useState} from "react";
import CommentItem from "./CommentItem";


export default function CommentList({

postId

}:{
postId:number

}){


const [comments,setComments]=useState<any[]>([]);



async function fetchComments(){


const res = await fetch(

`http://localhost:5000/api/comments/${postId}`,

{
cache:"no-store"
}

);


const data = await res.json();


setComments(data);


}



useEffect(()=>{

fetchComments();

},[]);



return (

<div className="mt-10">


<h2 className="text-2xl font-bold mb-5">

Comments ({comments.length})

</h2>



{
comments.map((comment)=>(

<CommentItem

key={comment.id}

comment={comment}

refresh={fetchComments}

/>

))

}



</div>

)


}