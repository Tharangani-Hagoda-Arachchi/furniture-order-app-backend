import Joi from "joi";

export const addItemSchema = Joi.object(
    {
        itemName: Joi
        .string()
        .required()
        .messages({
            'string.empty': 'Item Name is Required'
        })
    },
    {
        itemCategory: Joi
        .string()
        .required()
        .messages({
            'any.required': 'Item Category is Required'
        }),
    },
    {
        itemType: Joi
        .string()
        .required()
        .messages({
            'any.required': 'Item Type is Required'
        })
    },
    {
        itemPrice: Joi
        .number()
        .required()
        .messages({
            'any.required': 'Item Price is Required',
            'number.base': 'Inavalid Format'
        }),
    },
    {
        itemColor: Joi
        .array()
        .items(Joi.string())
        .required()
        .messages({
            'any.required': 'Item Coloris Required'
        })
    },
    {
        itemRatings: Joi
        .number()
        .min(0)
        .max(5)
        .messages({
            'number.base': 'Inavalid Format'
        })
    },
    {
        length: Joi
        .number()
        .required()
        .messages({
            'any.required': 'Item Length Required',
            'number.base': 'Inavalid Format'
        })
    },
    {
        width: Joi
        .number()
        .required()
        .messages({
            'any.required': 'Item Width Required',
            'number.base': 'Inavalid Format'
        })
    },
    {
        height: Joi
        .number()
        .required()
        .messages({
            'any.required': 'Item Height Required',
            'number.base': 'Inavalid Format'
        })
    },
    {
        unit: Joi
        .string()
        .required()
        .messages({
            'any.required': 'Item Length Required',
        })
    },
    
)