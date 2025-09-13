import express from 'express'
import { validate } from '../middlewares/validate.js'
import { login, logout, register } from '../controllers/authController.js'
import { uservalidationSchema } from '../validators/userValidator.js'


const authRoute = express.Router()

// add/ register new user route
authRoute.post('/register',validate(uservalidationSchema), register)
// login route
authRoute.post('/login', login)
// logout route
authRoute.post('/logout', logout)



export default authRoute