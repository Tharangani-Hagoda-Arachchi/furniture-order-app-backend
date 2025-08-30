import Joi from "joi";

export const addCategorySchema = Joi.object(
    {
        categoryName: Joi
        .string()
        .required()
        .messages({
            'any.required' : 'Category Name is Required'
        }),


    }
)