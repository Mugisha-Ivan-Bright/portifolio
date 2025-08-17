import express from 'express';
import cors from 'cors';
import { connectDb } from './model/connectDb.js';
import dotenv from 'dotenv';
// import route from './friend.route.js';
import friends from './model/friends.js';

import path from 'path';
import { fileURLToPath } from 'url';
import Comment from './model/comment.js';

const app = express();

dotenv.config();

app.use((req,res,next)=>{
    console.log(req.url, req.body);
    next();
})
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log(__filename,__dirname)
app.use(express.static(path.join(__dirname, "../html")));
app.use("/css",express.static(path.join(__dirname, "../css")));
app.use("/utils", express.static(path.join(__dirname,"../utils")));


app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "../html/landing.html"));
})

app.post("/submit", async (req, res)=>{

    try {
        console.log(req.body);
        const {name, email} = req.body;
        if(!name || !email) return res.status(404).json({error:"Names and email are missing"});

        const userExists = await friends.findOne({email});

        if(userExists) return res.status(400).json({message:"Already signed in"});

        const newFriend = new friends({name, email});

        await newFriend.save();

        res.status(200).json({succcess:true, message:"Friend recorded"}).redirect("./thankyou.html");
        
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});

app.post("/comment", async(req, res)=>{
    try {
        const {comment} = req.body;
        if(!comment) return res.status(400).json({succcess:false, message:"Write something please"});

        const newComment = new Comment({comment});
        await newComment.save();

        res.status(200).json({succcess:true, message:"Thank you"});
    } catch (error) {
     res.status(500).json({error:error.message});

    }
})


app.listen(process.env.PORT,()=>{
    connectDb();
    console.log("http://localhost:"+process.env.PORT)
})

