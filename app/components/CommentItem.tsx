import DeleteCommentButton from "./DeleteCommentButton";


export default function CommentItem({

    comment,

    refresh

}: {
    comment: any,
    refresh: () => void

}) {


    return (

        <div className="border rounded p-4 mb-3">


            <div className="flex justify-between">


                <div>

                    <h3 className="font-bold">

                        {comment.user.name}

                    </h3>


                    <p>

                        {comment.text}

                    </p>


                </div>



                <DeleteCommentButton

                    id={comment.id}

                    refresh={refresh}

                />


            </div>


        </div>

    )

}