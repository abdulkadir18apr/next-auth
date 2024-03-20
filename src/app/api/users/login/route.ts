import  {connect}  from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import { sendEmail } from "@/helpers/mailer";


connect()

export async function POST(request:NextRequest){
    try{
        const reqBody=await request.json();
        const {email,password}=reqBody;
        console.log(reqBody);
        //check if user already exist
        const user=await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"no user found"},{status:400});
        }

       

        const isPasswordValid=await bcryptjs.compare(password,user.password);
        if(!isPasswordValid){
            return NextResponse.json({error:"Invalid Password"},{status:400})
        }
        //check if user is verified
        if(!user.isVerified){
            sendEmail(email,"VERIFY",user._id);
            return NextResponse.json({message:"please verify your email",success:false});
        }
        const tokenData={
            id:user._id,
            userName:user.userName,
            email:user.email
        }
        const token= await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"});

        const response=NextResponse.json({
            message:"login success",
            success:true
        })
        response.cookies.set("token",token,{
            httpOnly:true
        })
        return response
    }
    catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}