import { AppError } from '../AppError.js';
import {Category} from '../models/furnitureCategory.js'

export const addCategory = async (req, res, next) => {
    try{
        const {categoryName} = req.body
        if (!req.file) return res.status(400).json({
            status: "Fail",
            message: "Image is Required"
        })

        // check if category is already exist
        const existingCategory = await Category.findOne({categoryName});
        if (existingCategory){
            return next (new AppError("Category Already Exist", 400));
        }

        const category = new Category({
            categoryName,
            categoryImage: `/uploads/${req.file.filename}`
        })

        category.save()
        
        // responce with code and message
        res.status(201).json({
            status: "Success",
            message: "New Category Added Successfully"
        })


    } catch(error){
        next(new AppError(error.message || "Failed to Add Category", 500))

    }
}