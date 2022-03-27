import { Router } from "express";
import {createPost, deletePost, getPost, getPosts, updatetePost} from "../controllers/post.controller.js"
const router = Router();

router.get("/posts",getPosts);
router.post("/posts",createPost);
router.put("/posts/:id",updatetePost);
router.delete("/posts/:id",deletePost);
router.get("/posts/:id",getPost);

export default router;