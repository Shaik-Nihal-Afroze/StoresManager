import mongoose from "mongoose"


export const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDb is connected to ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error in connectDB`,error.message)
        process.exit(1)
    }
}