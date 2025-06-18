import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    storeName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    storeimage:{
        type:String,
        default:''
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId ,ref :"User"
    },   
    category:{
        type:String,
        required:true,                
        enum:["fashion",'mobile','grocery','jewellery','furniture']
    },
    address:{
        type:String,
        required:true       
    },
    rating:{
        type:[Number],
        default:[],                
    },
    contact:{
        type:String,
        required:true,
        unique:true,
    }
    
    
})

export const Store =  mongoose.model('Store',storeSchema)