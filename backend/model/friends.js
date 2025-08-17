import mongoose from 'mongoose';


const friendSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},

},
{timestamps:true}
);


const friends = mongoose.model("friend", friendSchema);


export default friends;