import express from 'express';
import fs from 'fs';
import path from 'path';
import Joi from 'joi'
import { addCategory } from "../controllers/furnitureCategoryController.js";
import { validate } from "../middlewares/validate.js";
import multer from "multer";
import { addCategorySchema } from '../validators/furnitureCategoryValidator.js';
const categoryRouter  = express.Router();


// Multer setup with automatic folder creation
const uploadFolder = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });


// add new category route
categoryRouter.post('/furniture-categories',upload.single('categoryImage'),validate(addCategorySchema),addCategory)

export default categoryRouter