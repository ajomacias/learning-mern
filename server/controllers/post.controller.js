import Post from "../models/Post.js";
import { uploadImage, deleteImage } from "../libs/claudinary.js";
import fs from "fs-extra";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.send(posts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const data = await Post.findById(req.params.id);

    if (!data) return res.sendStatus(404);

    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    let image = null;
    const { title, description } = req.body;

    if(req.files?.image){
    const fileName = await uploadImage(req.files.image.tempFilePath);
    image = {
      url: fileName.secure_url,
      public_id:fileName.public_id
    }
    await fs.remove(req.files.image.tempFilePath);
    }
    const newPost = new Post({ title, description,image });

    await newPost.save();

    return res.json(newPost);

  } catch (err) {
    console.log(err);

    return res.status(500).json({ message: err.message });
    
  }
};

export const deletePost = async (req, res) => {
  try {
    const postRemove = await Post.findByIdAndDelete(req.params.id);

    if (!postRemove) return res.sendStatus(404);

    if(postRemove.image.public_id) await deleteImage(postRemove.image.public_id);

    return res.sendStatus(204);

  } catch (err) {

    return res.status(500).json({ message: err.message });

  }
};

export const updatetePost = async (req, res) => {
    try{

  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  return res.json(post);
}
  catch(err){

    return res.status(500).json({ message: err.message });

  }
};