"use client";

import {useState} from "react";

import CommentForm from "./CommentForm";
import CommentList from "./CommentList";


export default function BlogComments({
    postId
}:{
    postId:number
}){


const [refresh,setRefresh]=useState(0);



return (

<div>


<CommentForm

postId={postId}

onCommentAdded={()=>{

setRefresh(refresh + 1)

}}

/>



<CommentList

key={refresh}

postId={postId}

/>


</div>

)

}