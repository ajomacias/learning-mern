import toast from "react-hot-toast";
import {usePost} from "../context/postContext";
import { useNavigate} from "react-router-dom";
const PostCard = ({post})=>{
    const navigate = useNavigate();
    const {deletePost} = usePost();
 
    const handleDelete = (_id)=>{
        toast((e)=>(
            <div>
                <p className=" text-white" > 
                    Do you want tov delete? <strong> {_id} </strong>
                </p>
                <div>
                   <button onClick={()=>{
                        deletePost(_id)
                        toast.dismiss(e.id)
                        }} className="bg-red-600 hover:bg-red-500 rounded-sm py-1 mx-2 text-white " >Eliminar</button>
                   <button onClick={()=>toast.dismiss(e.id)} className="bg-green-600 hover:bg-green-500 rounded-sm py-1 mx-2  text-white" >Cancelar</button>
                </div>
                
            </div>
        ),{
            style:{
                background:"black"
            }
        })
    }

    return(
        
        <div className="bg-zinc-800 text-white rounded-sm shadow-black hover:bg-zinc-600 hover:cursor-pointer "
         onClick={()=>navigate(`/posts/${post._id}`)} >
            <div className="py-7 px-3" >   
            <div className="flex justify-between" >        
            <h1>
                {post.title}
            </h1>
            <button onClick={(e)=> {
                e.stopPropagation()
                handleDelete(post._id)
                }}  className="bg-red-500 text-sm text-white rounded-sm py-2 px-1">Eliminar</button>
            </div> 

            <p> {post.description} </p>
            { post.image && <img className="object-cover" src={post.image.url} /> }
            </div>
        </div>
    )
}

export default PostCard;