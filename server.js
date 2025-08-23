import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { dbConnect } from './dbConnect.js'

const app = express()
const port = 4000

app.use(cors())
app.use(express.json())
app.use(cookieParser())


dbConnect()

app.listen(port, () =>{
    console.log('server running on http://localhost:4000/')
})
