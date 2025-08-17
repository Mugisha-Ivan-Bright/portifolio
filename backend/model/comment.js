import mongoose from 'mongoose';


const commentSchema = new mongoose.Schema({
    comment:{type:String, required:true},
},
{timestamps:true}
);


const Comment = mongoose.model("comment", commentSchema);


export default Comment;