import { useState, useContext, createContext, useEffect } from "react";
import {getPostsRequests,createPostRequests, deletePostRequests, getPostRequests,updatePostRequests} from "../api/post";

const postContext = createContext();

export const usePost = ()=>{
    const context = useContext(postContext);
    return context;
}

const PostProvider = ({children})=>{
    const [posts, setPost ] = useState([]);

    const getPosts = async ()=>{
        const data = await getPostsRequests();
        setPost(data.data);
    };

    const createPost = async(post)=>{
        try{
            const res = await createPostRequests(post);
            setPost([...posts,res.data]);
            
        }catch(err){
            console.error(err)
        }
        

    }

    const deletePost = async(id)=>{
        const res = await deletePostRequests(id); 
        if(res.status === 204) setPost(posts.filter((item, i)=> item._id !== id ));
    }

    const getPost = async id =>{
        const res = await getPostRequests(id);
        return res
    }

    const updatePost = async(id, post)=>{
        const res = await updatePostRequests(id, post);
        setPost(posts.map(post=> post._id === id?res.data:post));
        return res;
    }

    useEffect(() => {
        getPosts();
      }, []);
    return(
        <postContext.Provider value={{
            posts,
            setPost,
            getPosts,
            createPost,
            deletePost,
            getPost,
            updatePost
        }}>
        {children}
        </postContext.Provider>
    )
}

export default PostProvider;