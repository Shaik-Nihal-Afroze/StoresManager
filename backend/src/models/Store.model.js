import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    score:{
        type:Number,
    }

})

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
    ratings:[ratingSchema],
    contact:{
        type:String,
        required:true,
        unique:true,
    }
    
    
})

export const Store =  mongoose.model('Store',storeSchema)