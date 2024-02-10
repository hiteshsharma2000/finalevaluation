const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
    title:{type:String,require:true},
    body:{type:String,require:true},
    device:{type:String,require:true}
})

const PostModel=mongoose.model("evalpost",postSchema)

module.exports={PostModel}