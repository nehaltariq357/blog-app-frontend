import BlogList from "../BlogList";


async function getPosts(){

const res = await fetch(
"http://localhost:5000/api/posts",
{
cache:"no-store"
}
);


return res.json();

}



export default async function BlogsPage(){


const posts = await getPosts();


return (

<div className="max-w-4xl mx-auto">


<h1 className="text-4xl mb-5">

All Blogs

</h1>


<BlogList posts={posts}/>


</div>

)

}