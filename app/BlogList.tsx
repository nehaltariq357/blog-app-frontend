import BlogCard from "./BlogCard";


export default function BlogList({
posts
}:{
posts:any[];
}){


return (

<div className="grid gap-5">


{
posts.map((post)=>(
<BlogCard

key={post.id}

post={post}

/>
))
}


</div>

)

}