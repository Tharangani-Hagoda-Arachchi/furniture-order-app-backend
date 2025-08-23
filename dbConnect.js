import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

export const dbConnect = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongo db connected")
    } catch(error){
        console.log("mongo db error", error)
    }


}


