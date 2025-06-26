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
        const {userId,score} = req.body
        
        if (!score || typeof(score) !=="number" || score < 1 || score > 5){
            return res.status(400).json({message:"Rating must be a number between 1 to 5"})
        }
        const store = await Store.findOne({storeName})
        if (!store){
            res.status(400).json({message:"No Store Found"})
            console.log("No Store Found")
        }
        const isScoreExist = store.ratings.find((rating)=>rating.userId.toString() === userId)
        if (isScoreExist){
            isScoreExist.score = score
        }
        else{
            store.ratings.push({userId,score})
        }
        await store.save()
      
        res.status(200).json({message:"Rating is updated successfully"},store)
    } catch (error) {
        console.log("Error is updateStoreRating controller in store controller")
        res.status(500).json({message:`${error.message}`})
    }
}