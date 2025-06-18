import { User } from "../models/User.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js"
export const signup = async(req,res) =>{
        const {fullName,email,password,role} =req.body
        try{            
            if(!fullName || !email || !password ){
                return res.status(400).json({message:"All fields are required"})
            }
            if(password.length<6){
                return res.status(400).json({message:"Password should have atleast 6 characters"})
            }
            const user = await User.findOne({email})
            if (user){
                return res.status(400).json({message:"User already exists"})
            } 
            
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password,salt)
            const newUser = new User({                
                fullName,
                email,
                password:hashedPassword,
                role
            })

            if (newUser){
                generateToken(newUser._id,res)
                await newUser.save()
                
                res.status(201).json({
                    _id:newUser._id,
                    fullName:newUser.fullName,
                    email:newUser.email,
                    role:newUser.role
                })
            }
            else{
                res.status(400).json({message:"Invalid User Credentials"})
            }
            
        }catch(error){
            console.log("Error is signup controller in auth controller")
            res.status(500).json({message:`${error.message}`})
        }
            
        
    
}
export const login = async(req,res) =>{
    
        try {
             const {email,password} =req.body
             if(!email || !password){
                return res.status(400).json({message:"All fields are required"})
             }

             const user = await User.findOne({email})

             if(!user){
                return res.status(400).json({message:"User do not exists"}) 
             }

             const isPasswordCorrect = await bcrypt.compare(password,user.password)
            
            if(!isPasswordCorrect){
                res.status(400).json({message:"Invalid User Credentials"})
            
            }


            generateToken(user._id,res)
            res.status(200).json({
                _id:user._id,
                fullName:user.fullName,
                email:user.email,
                role:user.role
            })



        } catch (error) {
            console.log("Error is login controller in auth controller")
            res.status(500).json({message:`${error.message}`})
        }
            
        
    
}
export const logout  = (req,res) =>{
    
        try{
            res.cookie('jwt',"",{maxAge:0})
            res.status(200).json({message:"Logged Out Successfully"})
        }catch(error){
            console.log("Error is logout controller in auth controller")
            res.status(500).json({message:`${error.message}`})
        }
            
        
    
}

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
    
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

