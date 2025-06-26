import { Store } from "../models/Store.model.js";

export const getAllStoresOfOwner = async(req,res)=>{
    try {
        const {id} = req.params 
        const getOwnerStores = await Store.find({owner:id})
        if (!getOwnerStores){
            res.status(400).json({message:"No Store Found"})
            console.log("No Store Found")
        }
        res.status(200).json(getOwnerStores)
    } catch (error) {
        console.log("Error is getAllStoreOfOwner controller in store controller")
        res.status(500).json({message:`${error.message}`})
    }
}
export const getStoreOfOwner = async(req,res)=>{
    try {
        const {storeName} = req.body
        
        const getOwnerStore = await Store.findOne({storeName:storeName})
        if (!getOwnerStore){
            res.status(400).json({message:"No Store Found"})
            console.log("No Store Found")
        }
        res.status(200).json(getOwnerStore)
    } catch (error) {
        console.log("Error is getStoreOfOwner controller in store controller")
        res.status(500).json({message:`${error.message}`})
    }
}



export const addStore = async(req,res)=>{
    
    try {
        const {storeName,storeimage,owner,category,address,rating,contact} = req.body 
        if(!storeName || !category || !address ||!owner){
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
            owner,
            address,
            rating,
            contact,
        })
        
        if(newStore){
            
            
            await newStore.save()
            return res.status(201).json({
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
export const deleteStore = async(req,res)=>{
    try {
        const {storeName} = req.body 
        if(!storeName ){
            return res.status(400).json({message:"Store Name are required"})
        }
        const store = await Store.findOneAndDelete({storeName})
        if (!store){
            return res.status(400).json({message:"Store do not exists!"})
        }        
        res.status(200).json({message:"Store deleted Successfully"})
    } catch (error) {
        console.log("Error is create store controller in store controller")
        res.status(500).json({message:`${error.message}`})
    }
}
