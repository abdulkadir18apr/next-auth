import mongoose from "mongoose"

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        require:[true,"please provide a userName"],
    },
    email:{
        type:String,
        require:[true,"please provide a email"],
        unique:true
    },
    password:{
        type:String,
        require:[true,"please provide a password"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
})

const User=mongoose.models.users || mongoose.model("users",userSchema);

export default User;