import { AppError } from "../AppError.js";
import { Item } from "../models/furnitureItem.js";

// add new Item
export const addItem = async (req, res, next) => {
    try{
        const {itemName,itemCategory,itemType,itemPrice,itemColor,itemWeight,itemMaterial,itemStyle,itemBrand,itemWarranty,itemAssembly,itemCareInstruction,itemDelivaryInfo,itemreturnPolicy,itemDimension} = req.body;
        

        if (!req.files|| req.files.length === 0) return res.status(400).json({
            status: "Fail",
            message: "Image is Required"
        })

        //for path of images
        const imagePaths = req.files ? req.files.map(file => `/item-images/${file.filename}`) : [];

        //check diamentions are available
        if (!itemDimension){
            return next (new AppError("Item Dimensions are Required", 400));
        }

        // check if item is already exist
        const existingItem = await Item.findOne({itemName});
        if (existingItem){
            return next (new AppError("Item Already Exist", 400));
        }

        const item = new Item({
            itemName,
            itemCategory,
            itemType,
            itemPrice,
            itemColor,
            itemWeight,
            itemMaterial,
            itemStyle,
            itemBrand,
            itemWarranty,
            itemAssembly,
            itemCareInstruction,
            itemDelivaryInfo,
            itemreturnPolicy,
            itemImages: imagePaths,
            itemDimension: {
                length: itemDimension.length,
                width: itemDimension.width,
                height: itemDimension.height,
                unit: itemDimension.unit || "in",
            }
        })

        item.save()
        
        // responce with code and message
        res.status(201).json({
            status: "Success",
            message: "New Item Added Successfully"
        })


    } catch(error){
        next(new AppError(error.message || "Failed to Add Category", 500))

    }
}