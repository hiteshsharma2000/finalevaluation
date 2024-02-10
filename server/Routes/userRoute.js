const express=require('express')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {UserModel}=require('../Models/userModel')
const dotenv=require('dotenv').config()


const userRoute=express.Router();

userRoute.post('/register',async (req,res)=>{
    const {name,email,gender,password}=req.body
    try {
        bcrypt.hash(password, 5,async function(err, hash) {
            if(err){
                res.send({mag:"something went wrong in hashing"})
            }else{
                const newuser=new UserModel({"name":name,"email":email,"gender":gender,"password":hash})
                await newuser.save()
                res.send({msg:"new user has been regiter"})
            }
        });
        
 

    } catch (error) {
        
        res.send({error:error.message})
    }
})
userRoute.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    try {
        
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password,function(err, result) {
                if(result){
                 const token = jwt.sign({userId:user._id ,name:user.name }, 'masai',{expiresIn:"1h"})
                 res.send({"msg":"login succesful","token":token,"userid":user._id})
                }else{
                 res.send({"error":"invalid password"})
                }
             })
        }else{
            res.send({msg:"email is not register"})
        }
  

    } catch (error) {
        
        res.send({error:error.message})
    }
})




module.exports={userRoute}