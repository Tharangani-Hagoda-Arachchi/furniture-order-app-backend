import express from 'express'
import path from 'path'
import fs from 'fs'
import multer from 'multer'
import { validate } from '../middlewares/validate.js'
import { addItemSchema } from '../validators/furnitureItemValidator.js'
import { addItem, getItemsByCategory, fetchItems } from '../controllers/furnitureItemController.js'

const itemRoute = express.Router()

// Multer setup with automatic folder creation
const uploadFolder = path.join(process.cwd(), 'item-images');
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadFolder),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
  });
  const upload = multer({ storage });

//add new item route
itemRoute.post('/items',validate(addItemSchema),upload.array("itemImages",10), addItem)

// fetch all items according to category route
itemRoute.get('/items/:categoryName',getItemsByCategory)

// fetch all items
itemRoute.get('/items',fetchItems)

export default itemRoute