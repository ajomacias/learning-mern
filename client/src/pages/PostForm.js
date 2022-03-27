import {Formik, Form, Field, ErrorMessage} from "formik";
import {usePost} from "../context/postContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as yup from "yup";
import {AiOutlineLoading3Quarters} from "react-icons/ai"

export const PostForm = () =>{
    const [post, setPost] = useState({
        title:"",
        description:"",
        image:null
    })
    const { createPost, getPost, updatePost} = usePost();
    const navigate = useNavigate();
    const params = useParams();
     
    useEffect(()=>{
        (async()=>{
            if(params?.id){
                const res = await getPost(params.id);
                setPost(res.data)
            }
        })();
    },[params.id])


    return (
    <div className=" flex items-center justify-center" >
        <div className="bg-zinc-800 p-10 shadow-md shadow-black" >
            <header className="flex justify-between items-center py-4 text-white" >
                <h3>New Post</h3>
                <Link to="/" className="text-gray-400 text-sm hover:text-gray-2 x00" >A por ello</Link>

            </header>
        <Formik initialValues={post}
        validationSchema={yup.object({
            title: yup.string().required("title is required").min(7),
            description: yup.string().required("description is required")
        })
            
        }
        onSubmit={async(value,actions)=>{

          if(!params.id){
            await createPost(value)
            
          }else{
            await updatePost(params.id,value)
          }
          actions.setSubmitting(false)
          navigate("/");
           
        }}
        enableReinitialize={true} >
            {({handleSubmit, setFieldValue, isSubmitting})=>(
                <Form onSubmit={handleSubmit}>
                <label htmlFor="title" className="text-sm block font-monospace text-gray-200" >Titulo</label>
                <Field className="px-3 py-3 focus:outline-none rounded bg-gray-600 w-full " name="title" placeholder="titulo" />
                <ErrorMessage className="text-red-400 text-sm" component="p" name="title" />
                <label htmlFor="title" className="text-sm block font-monospace text-gray-200" >Descipicion</label>
                <Field 
                className="px-3 py-3 focus:outline-none rounded bg-gray-600 w-full" 
                component="textarea"
                name="description" 
                placeholder="description"
                rows={3} />
                <ErrorMessage className="text-red-400 text-sm" component="p" name="description" />
                <label htmlFor="title" className="text-sm block font-monospace text-gray-200" >Titulo</label>
                <input name="image" type="file"  className="px-3 py-2 focus:outline-none bg-gray-400 text-white w-full"
                onChange={(e)=>setFieldValue("image", e.target.files[0])}/>
                <button
                disabled={isSubmitting} 
                className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded mt-2 to-white focus:outline-none disabled:bg-green-300c" 
                type="submit" >
                    {isSubmitting?(
                        <AiOutlineLoading3Quarters className="animate-spin h-5 w-5"  />
                    ):"Save"}
                </button>
            </Form>

            )}
            
        </Formik>
        </div>
        
    </div>
    );

}