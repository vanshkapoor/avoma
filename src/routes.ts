import {Posts} from "./pages/posts.tsx"
import {PostComments} from "./pages/postComments.tsx"

export const routes = {
    "posts": {
        route: "/",
        component: Posts
    },
    "postComments": {
        route: "/posts/:postId",
        component: PostComments,
    },
}