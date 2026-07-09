import BlogContent from "../../components/BlogContent";


async function getPost(id:string){

  const res = await fetch(
    `http://localhost:5000/api/posts/${id}`,
    {
      cache:"no-store"
    }
  );

  return res.json();
}


export default async function BlogPage({
  params,
}:{
  params: Promise<{id:string}>
}){


  const { id } = await params;


  const post = await getPost(id);
  console.log("posst", post);

if(!post.content){
 return <div>Post not found</div>
}
  return (
    <div>

      <h1>
        {post.title}
      </h1>


      <BlogContent
        content={post.content}
      />


    </div>
  );
}