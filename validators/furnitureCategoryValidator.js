import Joi from "joi";

export const addCategorySchema = Joi.object(
    {
        categoryName: Joi
        .string()
        .required()
        .messages({
            'any.require' : 'Category Name is Required'
        }),


    }
)