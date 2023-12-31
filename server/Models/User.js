import mongoose, { Schema } from "mongoose";

const User = new Schema({
    firstName:{
        type:String,
        required:true,
        min:2,
        max:50
    },lastName:{
        type:String,
        required:true,
        min:2,
        max:50
    },email:{
        type:String,
        required:true,
        unique:true,
        max:50
    },password:{
        type:String,
        required:true,
        min:2
    },picturePath:{
        type:String,
        default:""
    },friends:{
        type:Array,
        default:""
    },location:String,occupation:String,viewedProfile:Number,impression:Number

},{timestamps:true})

export default mongoose.model("User", User)