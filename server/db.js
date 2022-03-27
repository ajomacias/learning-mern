import mongoose from "mongoose";
import {MONGODB_URI} from "./config.js";


export async function connectDB(){
    try{
        const db = await mongoose.connect(MONGODB_URI);
        console.log(db.connection.name);
    }catch(err){
        console.error(err);

    }
}
