import { AppError } from "../AppError.js";
import { Category } from "../models/furnitureCategory.js";
import { Item } from "../models/furnitureItem.js";

// add new Item
export const addItem = async (req, res, next) => {
    try{
        const {itemName,itemCategory,itemType,itemPrice,itemDiscount,itemColor,itemAvailability,itemDescription,itemWeight,itemMaterial,itemStyle,itemBrand,itemWarranty,itemAssembly,itemCareInstruction,itemDelivaryInfo,itemreturnPolicy,itemDimension} = req.body;
        

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
        // check if item category is valid
        const category = await Category.findOne({categoryName:itemCategory});
        if (!category){
            return next (new AppError("Item Category is not Valid", 400));
        }

         // Convert itemColor array to hex codes
        const colorHexArray = Array.isArray(itemColor)? itemColor.map(name => mapColorNameToHex(name)): [];

        const item = new Item({
            itemName,
            itemCategory: category._id,
            itemType,
            itemPrice,
            itemDiscount,
            itemColor: colorHexArray,
            itemAvailability,
            itemDescription,
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

//get item by category
export const getItemsByCategory = async (req, res, next) => {
    try {
        const {categoryName}  = req.params;

        //cheeck the category is available
        if (!categoryName){
            return next (new AppError("Item Category are Required", 400));
        }

        // Search for categoryid with givena category name
        const category = await Category.findOne({ categoryName });

        if (!category) {
            return next (new AppError("Item Category are Not Found", 400));
        }
        // Search for items belong to categoryid 
        const itemsWithCategory = await Item.find({ itemCategory: category._id });

        if (!itemsWithCategory) {
            return next (new AppError("Items in this Category are Not Found", 400));
        }
        // responce with code and message
        res.status(200).json({
            status: "Success",
            message: "Fetch All Items According to Category Successfully",
            data: itemsWithCategory

        })
        next()
    } catch (error) {
        next(new AppError(error.message || "Failed to Fetch Items", 500))
    }
};



// featch all items
export const fetchItems = async (req, res, next) => {
    try{

        // check if item is  empty
        const items = await Item.find();
        if (!items){
            return next (new AppError("No Item Found", 404));
        }

        // responce with code and message
        res.status(200).json({
            status: "Success",
            message: "Fetch All  Items Successfully",
            data: items

        })


    } catch(error){
        next(new AppError(error.message || "Failed to Fetch Category Items", 500))

    }
}

//get item by id
export const getItemsByID = async (req, res, next) => {
    try {
        const {_id}  = req.params;

        //cheeck the id is available
        if (!_id){
            return next (new AppError("Item ID Required", 400));
        }

        const itemsWithID = await Item.findOne({_id});

        if (!itemsWithID) {
            return next (new AppError("Item is Not Found", 400));
        }
        // responce with code and message
        res.status(200).json({
            status: "Success",
            message: "Fetch Item According to ID",
            data: itemsWithID

        })
        next()
    } catch (error) {
        next(new AppError(error.message || "Failed to Fetch Item", 500))
    }
};


