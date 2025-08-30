import Joi from "joi";

export const addItemSchema = Joi.object(
    {
        itemName: Joi
        .string()
        .required()
        .message({
            'any.required': 'Item Name is Required'
        })
    },
    {
        itemCategory: Joi
        .string()
        .required()
        .message({
            'any.required': 'Item Category is Required'
        })
    },
    {
        itemType: Joi
        .string()
        .required()
        .message({
            'any.required': 'Item Type is Required'
        })
    },
    {
        itemPrice: Joi
        .number()
        .required()
        .message({
            'any.required': 'Item Price is Required',
            'number.base': 'Inavalid Format'
        }),
    },
    {
        itemColor: Joi
        .array()
        .items(Joi.string())
        .required()
        .message({
            'any.required': 'Item Coloris Required'
        })
    },
    {
        itemRatings: Joi
        .number()
        .min(0)
        .max(5)
        .message({
            'number.base': 'Inavalid Format'
        })
    },
    {
        length: Joi
        .number()
        .required()
        .message({
            'any.required': 'Item Length Required',
            'number.base': 'Inavalid Format'
        })
    },
    {
        width: Joi
        .number()
        .required()
        .message({
            'any.required': 'Item Width Required',
            'number.base': 'Inavalid Format'
        })
    },
    {
        height: Joi
        .number()
        .required()
        .message({
            'any.required': 'Item Height Required',
            'number.base': 'Inavalid Format'
        })
    },
    {
        unit: Joi
        .string()
        .required()
        .message({
            'any.required': 'Item Length Required',
        })
    },
    
)