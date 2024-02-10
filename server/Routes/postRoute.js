const express=require("express")
const {PostModel}=require('../Models/postModel')
const {auth}=require('../Middleware/auth')
const postRoute=express.Router()

postRoute.get('/',auth,async (req,res)=>{

    try {
        const getpost=await PostModel.find()
       console.log(process.env.MONGOURL); 
        res.send({post:getpost})
    } catch (error) {
        res.send({error:error.message})
    }
})
postRoute.post('/add',auth,async (req,res)=>{

    try {
        const addpost=new PostModel(req.body)
        await addpost.save()
        res.send({"msg":"new post has been created"})
    } catch (error) {
        res.send({error:error.message})
    }
})

postRoute.patch('/update/:userid',auth,async (req,res)=>{
    const {userid}=req.params;

    try {
        const updatepost=await PostModel.findByIdAndUpdate({_id:userid},req.body)
       
        res.send({"msg":"post has been updated"})
    } catch (error) {
        res.send({error:error.message})
    }
})
postRoute.delete('/delete/:userid',auth,async (req,res)=>{
    const {userid}=req.params;

    try {
        const updatepost=await PostModel.findByIdAndDelete({_id:userid},req.body)
       
        res.send({"msg":"post has been deleted"})
    } catch (error) {
        res.send({error:error.message})
    }
})

module.exports={postRoute}