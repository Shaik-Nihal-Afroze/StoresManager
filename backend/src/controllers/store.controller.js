import { Store } from "../models/Store.model.js";
import cloudinary from "../lib/cloudinary.js";
export const createStore = async(req,res)=>{
    // const {owner} = req.user._id
    try {
        const {storeName,storeimage,category,owner,address,rating,contact} = req.body 
        if(!storeName || !category || !address ||!contact){
            return res.status(400).json({message:"Mandatory fields are required"})
        }
        const store = await Store.findOne({storeName})
        if (store){
            return res.status(400).json({message:"Store already exists"})
        } 
        // const uploadImage = await cloudinary.uploader.upload(storeimage)
        // const imageUrl = uploadImage.secure_url
        const newStore = new Store({
            storeName,
            storeimage,
            category,
            owner:req.user._id,
            address,
            rating,
            contact,
        })
        
        if(newStore){
            await newStore.save()
            res.status(201).json({
                    _id:newStore._id,
                    storeName:newStore.storeName,
                    storeimage:newStore.storeimage,
                    owner:newStore.owner,
                    category:newStore.category,
                    address:newStore.address,
                    rating:newStore.rating,
                    contact:newStore.contact
                })
        }
        

    } catch (error) {
        console.log("Error is create store controller in store controller")
        res.status(500).json({message:`${error.message}`})
    }
}

export const getStore = async(req,res)=>{
    try {
        const {id} = req.params
        const store = await Store.findById(id)
        if(!store){
            res.status(400).json({message:"No Store Found"})
            console.log("No Store Found")
        }
        res.status(200).json(store)
    } catch (error) {
        console.log("Error is getStore controller in store controller")
        res.status(500).json({message:`${error.message}`})
    }
}
export const getAllStores = async(req,res)=>{
    try {
        const allStores = await Store.find()
        res.status(200).json(allStores)
    } catch (error) {
        console.log("Error is getAllStores controller in store controller")
        res.status(500).json({message:`${error.message}`})
    }
}
