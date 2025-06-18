import jwt from 'jsonwebtoken'
import { User } from "../models/User.model.js"
export const protectedRoute = async(req,res,next)=>{
    try {
        const token = req.cookies.jwtToken;
        if(!token){
            return res.status(400).json({message:"Unauthorized - No Token Found"}) 
        }
        const isTokenValid = jwt.verify(token,process.env.JWT_SECRET);

        if(!isTokenValid){
            return res.status(400).json({message:"Unauthorized - Invalid Token"}) 
        }
        const user = await User.findById(isTokenValid.userId).select("-password")
        if (!user){
            return res.status(400).json({message:"User Not Found"}) 
        }
        req.user = user 
        next()
    } catch (error) {
        console.log(`Error in protectedRoute: ${error.message}`)
        res.status(500).json({message:"Internal Server Error"})
    }
    
    
}