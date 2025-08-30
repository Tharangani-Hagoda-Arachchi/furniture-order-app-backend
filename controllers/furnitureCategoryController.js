import { AppError } from '../AppError.js';
import {Category} from '../models/furnitureCategory.js'

// add new category
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


// featch all category items
export const fetchCategory = async (req, res, next) => {
    try{

        // check if category is  empty
        const category = await Category.find();
        if (!category){
            return next (new AppError("No category", 404));
        }

        // responce with code and message
        res.status(200).json({
            status: "Success",
            message: "Fetch All Category Items Successfully",
            data: category

        })


    } catch(error){
        next(new AppError(error.message || "Failed to Fetch Category Items", 500))

    }
}