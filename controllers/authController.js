import { createAccessToken, createRefreshToken } from '../utils/token.js';
import bcrypt from 'bcrypt'
import dotenv from "dotenv";
import { User } from '../models/user.js';
import { AppError } from '../AppError.js';
dotenv.config();

const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  NODE_ENV
} = process.env;

const cookieOptions = {
  httpOnly: true,
  secure: NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
};



// register new
export const register= async (req, res, next) => {
    try{
        const {name, email, password, role} = req.body

        // check if email is already exist
        const existingEmail = await User.findOne({email});
        if (existingEmail){
            return next (new AppError("User Already Exist", 400));
        }
        
        //hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password:hashedPassword,
            role:role && role.trim() !== '' ? role : 'customer'
        })

        await user.save()

        // craete tokens
        const payload  ={id: user._id, role: user.role, email: user.email}
        const accessToken = createAccessToken(payload,JWT_ACCESS_SECRET,ACCESS_TOKEN_EXPIRES_IN || '15m')
        const refreshToken = createRefreshToken(payload,JWT_REFRESH_SECRET,REFRESH_TOKEN_EXPIRES_IN || '7d')

        //save refresh token
        user.refreshToken.push(refreshToken)
        await user.save()

        // send refresh token as htttpOnly cookie
        res.cookie('refreshToken', refreshToken,{ ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000})

        // responce with code and message
        res.status(201).json({
            status: "Success",
            message: "Registered Successfully",
            accessToken
        })


    } catch(error){
        next(error)

    }
}

// login
export const login= async (req, res, next) => {
    try{
        const {email, password} = req.body

        if(!email || !password){
            return next (new AppError("Email and Password required", 400));
        }

        // check if user is  exist
        const user = await User.findOne({email});
        if (!user){
            return next (new AppError("Invalid Credentials", 401));
        }
        
        //match password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return next (new AppError("Invalid Credentials", 401));
        }

        // craete tokens
        const payload  ={id: user._id, role: user.role, email: user.email}
        const accessToken = createAccessToken(payload,JWT_ACCESS_SECRET,ACCESS_TOKEN_EXPIRES_IN || '15m')
        const refreshToken = createRefreshToken(payload,JWT_REFRESH_SECRET,REFRESH_TOKEN_EXPIRES_IN || '7d')

        //save refresh token
        user.refreshToken.push(refreshToken)
        await user.save()

        // send refresh token as htttpOnly cookie
        res.cookie('refreshToken', refreshToken,{ ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000})

        // responce with code and message
        res.status(201).json({
            status: "Success",
            message: "Login Successfully",
            accessToken
        })


    } catch(error){
        next(error)

    }
}

