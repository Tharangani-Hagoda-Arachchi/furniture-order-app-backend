import mongoose from "mongoose";

//item diamension schema
const diamentionSchema = new mongoose.Schema({
    length: {
        type: Number,
        require: true
    },
    width: {
        type: Number,
        require: true
    },
    height: {
        type: Number,
        require: true
    },
    unit: {
        type: String,
        require: true,
        default: "in"
    },
})

// item schema
const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        require: true,
        trim: true
    },
    itemCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    itemType: {
        type: String,
        require: true
    },
    itemPrice: {
        type: Number,
        require: true
    },
    itemDiscount: {
        type: Number,
        default: 0
    },
    itemColor: [{
        type: String,
        require: true
    }],
    itemAvailability: {
        type: String,
        require: true, 
        default: "available"
    },
    itemDescription: {
        type: String,
        require: true,
    },
    itemWeight: {
        type: String
    },
    itemMaterial: {
        type: String
    },
    itemStyle: {
        type: String
    },
    itemBrand: {
        type: String
    },
    itemWarranty: {
        type: String
    },
    itemAssembly: {
        type: String
    },    
    itemCareInstruction: {
        type: String
    },
    itemDelivaryInfo: {
        type: String
    },
    itemreturnPolicy: {
        type: String
    },
    itemRatings: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    itemImages: [{
        type: String,
        require: true
    }],
    itemDimension: {
        type: diamentionSchema,
        require: true
    }
},
{timestamps: true}
);

export const Item = mongoose.model("Item", itemSchema)


