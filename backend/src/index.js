import express from 'express'
import dotenv from 'dotenv'

import cors from 'cors'
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'
import authRoutes  from "./routes/auth.route.js"
import storeRoutes  from "./routes/store.route.js"
import userRoutes from "./routes/user.route.js"
import ownerRoutes from "./routes/owner.route.js"
import adminRoutes from "./routes/admin.route.js"
const app = express()
app.use(express.json())
app.use(cookieParser())
dotenv.config()


const allowedOrigin = [process.env.FRONTEND_URL || 'http://localhost:5173']

app.use(cors({
    origin:allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true,
}))


app.use("/api/auth",authRoutes)
app.use("/api/stores",storeRoutes)
app.use("/api/users",userRoutes)
app.use("/api/owners",ownerRoutes)
app.use("/api/admin",adminRoutes)




const PORT  = process.env.PORT || 5001
app.listen(PORT,()=>{
    console.log(`Server is running at PORT:`+PORT)
    connectDB()
})