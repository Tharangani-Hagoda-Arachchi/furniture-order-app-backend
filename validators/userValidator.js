import Joi from "joi"

export const uservalidationSchema = Joi.object(
    {
        name: Joi
            .string()
            .required()
            .messages({
                'string.empty': 'Name is Required'
            }),

        email: Joi
            .string()
            .email()
            .required()
            .messages({
                'any.required': 'email is Required',
                'string.email': 'Email must be a valid email',
            }),

        password: Joi
            .string()
            .min(6)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/)
            .required()
            .messages({
                'any.required': 'Password is Required',
                'string.min': 'Password must be at least 6 characters long',
                'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            }),

        role: Joi
        .string()
        .valid("customer", "admin")
        .optional(),
    }

)