"use client";

import { Editor } from "@tiptap/react";
import { useState } from "react";


export default function Toolbar({
  editor,
}: {
  editor: Editor;
}) {


const [url,setUrl] = useState("");



const addLink = ()=>{

const previousUrl = editor.getAttributes("link").href;


const url = window.prompt(
"Enter URL",
previousUrl
);


if(url === null){
return;
}


if(url === ""){

editor
.chain()
.focus()
.extendMarkRange("link")
.unsetLink()
.run();

return;

}



editor
.chain()
.focus()
.extendMarkRange("link")
.setLink({
href:url,
})
.run();


};



return (

<div className="flex flex-wrap gap-2 mb-4">


{/* Bold */}

<button

onClick={()=>editor.chain().focus().toggleBold().run()}

className={
editor.isActive("bold")
?
"bg-black text-white px-3 py-1 rounded"
:
"border px-3 py-1 rounded"
}

>

B

</button>



{/* Italic */}

<button

onClick={()=>editor.chain().focus().toggleItalic().run()}

className={
editor.isActive("italic")
?
"bg-black text-white px-3 py-1 rounded"
:
"border px-3 py-1 rounded"
}

>

I

</button>





{/* Heading 1 */}

<button

onClick={()=>
editor.chain()
.focus()
.toggleHeading({
level:1
})
.run()
}

className={
editor.isActive("heading",{level:1})
?
"bg-black text-white px-3 py-1 rounded"
:
"border px-3 py-1 rounded"
}

>

H1

</button>





{/* Heading 2 */}

<button

onClick={()=>
editor.chain()
.focus()
.toggleHeading({
level:2
})
.run()
}

className={
editor.isActive("heading",{level:2})
?
"bg-black text-white px-3 py-1 rounded"
:
"border px-3 py-1 rounded"
}

>

H2

</button>





{/* Bullet List */}

<button

onClick={()=>
editor.chain()
.focus()
.toggleBulletList()
.run()
}

className={
editor.isActive("bulletList")
?
"bg-black text-white px-3 py-1 rounded"
:
"border px-3 py-1 rounded"
}

>

• List

</button>





{/* Ordered List */}

<button

onClick={()=>
editor.chain()
.focus()
.toggleOrderedList()
.run()
}

className={
editor.isActive("orderedList")
?
"bg-black text-white px-3 py-1 rounded"
:
"border px-3 py-1 rounded"
}

>

1. List

</button>





{/* Link */}

<button

onClick={addLink}

className={
editor.isActive("link")
?
"bg-black text-white px-3 py-1 rounded"
:
"border px-3 py-1 rounded"
}

>

🔗 Link

</button>





{/* Code Block */}

<button

onClick={()=>
editor.chain()
.focus()
.toggleCodeBlock()
.run()
}

className={
editor.isActive("codeBlock")
?
"bg-black text-white px-3 py-1 rounded"
:
"border px-3 py-1 rounded"
}

>

{"</>"}

</button>



</div>


)

}