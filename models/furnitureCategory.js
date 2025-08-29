import mongoose from "mongoose";

//ctegory schema
const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        require: true,
        trim: true
    },
    categoryImage: {
        type: String,
        require: true
    }
})

export const Category = mongoose.model("Category",categorySchema);



