import express from "express";
import postRoutes from "./routes/post.routes.js";
import fileupload from "express-fileupload";

const app = express();

app.use(express.json());
app.use(fileupload({
    useTempFiles: true,
    tempFileDir:"./upload"
}))

app.use(postRoutes);

export default app;