import Link from "next/link";


export default function BlogCard({
post
}:{
post:any;
}){


return (

<div className="border p-5 rounded-lg">


<h2 className="text-2xl font-bold">

{post.title}

</h2>


<p className="text-gray-600">

{post.content.replace(/<[^>]+>/g,"").slice(0,120)}

...

</p>



<Link

href={`/blog/${post.id}`}

className="text-blue-500"

>

Read More

</Link>



</div>

)

}