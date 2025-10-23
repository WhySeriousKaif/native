import mongoose from 'mongoose'



const userSchema=new mongoose.Schema({
    clerkId:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    fistName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    profileImage:{
        type:String,
        default:'',
    },
    bannerImage:{   
        type:String,
        default:'',
    },
    bio:{
        type:String,
        default:'',
    },
    location:{
        type:String,
        default:'', 
    },
    // followers will be array of user ids
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            // referring to User model
            ref:'User',
        }
    ],
    // following will be array of user ids
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        }
    ]
    
},{timestamps:true})

const User=mongoose.model('User',userSchema)
export default User 