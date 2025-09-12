import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { dbConnect } from './dbConnect.js'
import categoryRouter from './routes/furnitureCategoryRoutes.js'
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import itemRoute from './routes/furnitureItemRoutes.js'
import errorHandler from "./middlewares/errorHandler.js"; 
import authRoute from './routes/authRoute.js'


const app = express()
const port = 4000

app.use(cors())
app.use(express.json())
app.use(cookieParser())



app.use('/uploads', express.static('uploads'));
app.use('/item-images', express.static('item-images'));


dbConnect()

app.use('/api',categoryRouter)
app.use('/api',itemRoute)
app.use('/api/auths',authRoute)

// Swagger UI route
const swaggerDocument = YAML.load("./swagger.yaml");

// Serve Swagger docs at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler)

app.listen(port, () =>{
    console.log('server running on http://localhost:4000/');
    console.log("Swagger docs at http://localhost:4000/api-docs");
})
