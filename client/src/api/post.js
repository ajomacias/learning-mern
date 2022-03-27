import axios from "axios";

export const getPostsRequests = async()=>{
   const data = axios.get("/posts");  
   return data;
}

export const createPostRequests = async(post)=>{
   const formulario = new FormData();
   for(let key in post){
      formulario.append(key, post[key])
   }
   const data = axios.post("/posts",formulario,{
       header:{
          "Content-Type": "multipart/form-data"
       }
   });  
   return data;
}

export const deletePostRequests = async(id)=>await axios.delete("/posts/"+id );

export const getPostRequests = async id => await axios.get(`/posts/${id}`);

export const updatePostRequests =  async(id, newFields)=> await axios.put("/posts/"+id, newFields)