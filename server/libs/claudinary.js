import { v2 as claudinary } from "cloudinary";
import { CLOUD_API_KEY,CLOUD_NAME,CLOUD_API_SECRET } from "../config.js";

claudinary.config({
    cloud_name:CLOUD_NAME,
    api_key:CLOUD_API_KEY,
    api_secret:CLOUD_API_SECRET
})

export const uploadImage = async (filePath) =>{

    const filename = await claudinary.uploader.upload(filePath,{
        folder:"post"
    })
    return filename;

}

export const deleteImage = async (id)=>{
    return await claudinary.uploader.destroy(id);
}