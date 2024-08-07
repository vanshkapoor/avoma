import { useQuery } from "@tanstack/react-query"
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const PostComments = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const location = useLocation()
    const postTitle = location.state?.title ?? null;
    const postBody = location.state?.body ?? null;

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const data = await fetch(`https://jsonplaceholder.typicode.com/comments?${postId}`)
            const response = await data.json();
            return response;
        },
    })

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return <>
        <p className="container mx-auto text-lg font-bold py-4 mb-4">POST</p>
        <div className="container mx-auto">
            {postTitle && postBody && <div
                className="mb-4 rounded-xl bg-slate-300 border-2 p-4">
                <h1 className="font-bold text-sm text-slate-500">POST</h1>
                <h1 className="font-medium">{postTitle}</h1>
                <p className="text-slate-500">{postBody}</p>
            </div>}

            <p className="font-bold text-sm text-slate-500 mb-2">COMMENTS</p>
            {data && data.map((post, index) => <div>
                <div
                key={index}
                className="mb-4 rounded-xl bg-slate-100	p-4 hover:text-sky-400 ml-6">
                    <div className="flex justify-between">
                        <h1 className="font-medium">{post.name}</h1>
                        <p className="text-slate-500">{post.email}</p>
                    </div>
                <p className="text-slate-500">{post.body}</p>
            </div></div>)}
        </div>
    </>
}
