"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Toolbar from "./Toolbar";

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

import { createLowlight, common } from "lowlight";

import { useEffect } from "react";


const lowlight = createLowlight(common);



export default function TiptapEditor({
content,
onChange,
}:{
content:string;
onChange:(value:string)=>void;
}){


const editor = useEditor({

extensions:[


StarterKit.configure({

codeBlock:false,

}),


Placeholder.configure({

placeholder:"Start writing your blog..."

}),


Link.configure({

openOnClick:false,

}),


Image,


CodeBlockLowlight.configure({

lowlight,

}),


],


content:content || "",


onUpdate:({editor})=>{

onChange(editor.getHTML());

}


});



useEffect(()=>{

if(editor && content){

editor.commands.setContent(content);

}

},[editor,content]);



if(!editor){

return null;

}



return (

<div className="border rounded p-4">

<Toolbar editor={editor}/>


<EditorContent editor={editor}/>


</div>

)

}