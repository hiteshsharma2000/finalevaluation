const express=require('express');
const {connection}=require('./db')
const app=express();
const {userRoute}=require('./Routes/userRoute')
const {postRoute}=require('./Routes/postRoute')
const cors=require('cors')
app.use(express.json())
app.use(cors({
    origin:"*"
}))
app.use('/users',userRoute)
app.use('/posts',postRoute)

app.get("/",(req,res)=>{
    try {
        res.send({msg:"Home screen"})
        
    } catch (error) {
        res.send({error:error.message})
    }
})

app.listen(8080,async (req,res)=>{
    try {
        await connection
        console.log('server is live');

        
    } catch (error) {
        console.log(error.message);
    }
})