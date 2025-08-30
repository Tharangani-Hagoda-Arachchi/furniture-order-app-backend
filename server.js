import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { dbConnect } from './dbConnect.js'
import categoryRouter from './routes/furnitureCategoryRoutes.js'
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import itemRoute from './routes/furnitureItemRoutes.js'
import errorHandler from "./middlewares/errorHandler.js"; 


const app = express()
const port = 4000

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use(errorHandler)

app.use('/uploads', express.static('uploads'));


dbConnect()

app.use('/api',categoryRouter)
app.use('/api',itemRoute)

// Swagger UI route
const swaggerDocument = YAML.load("./swagger.yaml");

// Serve Swagger docs at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () =>{
    console.log('server running on http://localhost:4000/');
    console.log("Swagger docs at http://localhost:4000/api-docs");
})
