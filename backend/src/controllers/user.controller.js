import { User } from "../models/User.model.js"
import {Store} from "../models/Store.model.js"
export const getAllUsers = async(req,res)=>{
    try {
            const allUsers = await User.find()
            res.status(200).json(allUsers)
        } catch (error) {
            console.log("Error is getAllUsers controller in store controller")
            res.status(500).json({message:`${error.message}`})
        }
}

export const updateStoreRating = async(req,res)=>{
    try {
        const {storeName} = req.params
        const {rating} = req.body
        
        if (!rating || typeof(rating) !=="number" || rating < 0 || rating > 5){
            return res.status(400).json({message:"Rating must be a number between 0 to 5"})
        }
        const UpdatedOwnerStore = await Store.findOneAndUpdate({storeName},{$push:{rating}},{new:true})
        if (!UpdatedOwnerStore){
            res.status(400).json({message:"No Store Found"})
            console.log("No Store Found")
        }
        res.status(200).json({message:"Rating is updated successfully"},{store:UpdatedOwnerStore})
    } catch (error) {
        console.log("Error is updateStoreRating controller in store controller")
        res.status(500).json({message:`${error.message}`})
    }
}