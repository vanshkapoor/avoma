import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiRestComponent } from "../components/ApiRestComponent";

export const Posts = () => {
    const navigate = useNavigate();
    const [searchval, setSearchval] = useState<string>("");
    const [filteredPosts, setFilteredPosts] = useState<[]>([]);

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const data = await fetch('https://jsonplaceholder.typicode.com/posts')
            const response = await data.json();
            return response;
        },
    })

    useEffect(() => {
        if (data) {
            setFilteredPosts(data);
        }
    }, [data]);


    const filterPosts = () => {
        const newposts = data.filter(post => post.title.indexOf(searchval) > -1);
        setFilteredPosts(newposts);
    }

    return <ApiRestComponent isPending={isPending} isError={isError}> 
    <div className="container mx-auto">
        <p className="container mx-auto text-lg font-bold py-4 mb-4">ALL POSTS</p>
        <input type="text" className="border-2 p-1 mb-4 rounded-md" placeholder="search posts" onChange={e => setSearchval(e.target.value)} />
        <button
            type="submit"
            onClick={() => filterPosts()}
            className="border-2 px-2 py-1 mx-2 rounded-md bg-sky-500 text-white">Filter</button>
        <div className="container mx-auto">
            {filteredPosts && filteredPosts.map((post, index) => <div
                key={index}
                onClick={() => navigate(`/posts/${post.id}`, { state: { title: post.title, body: post.body } })}
                className="mb-4 rounded-xl bg-slate-100	p-4 hover:text-sky-400 cursor-pointer">
                <h1 className="font-medium">{post.title}</h1>
                <p className="text-slate-500">{post.body}</p>
            </div>)}
        </div>
    </div>
    </ApiRestComponent>
}
