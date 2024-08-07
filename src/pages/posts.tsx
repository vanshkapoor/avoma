import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";

export const Posts = () => {
    const navigate = useNavigate();

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const data = await fetch('https://jsonplaceholder.typicode.com/posts')
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
        <p className="container mx-auto text-lg font-bold py-4 mb-4">ALL POSTS</p>
        <div className="container mx-auto">
            {data && data.map((post, index) => <div
                key={index}
                onClick={() => navigate(`/posts/${post.id}`,  { state: { title: post.title, body: post.body } })}
                className="mb-4 rounded-xl bg-slate-100	p-4 hover:text-sky-400 cursor-pointer">
                <h1 className="font-medium">{post.title}</h1>
                <p className="text-slate-500">{post.body}</p>
            </div>)}
        </div>
    </>
}
