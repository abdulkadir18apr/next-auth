import  {connect}  from "@/dbconfig/dbconfig";
import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";




connect();


export  async function POST(request:NextRequest){
    try{

        const reqBody=await request.json();
        const {userName,email,password}=reqBody;
        console.log(reqBody);

        //check if user already exist

        const user=await User.findOne({email});
        if(user){
            return NextResponse.json({error:"user already exist"},{status:400});
        }
        //hash password
        const salt=await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt);
        const newUser=new User({
            userName,password:hashedPassword,email
        });
        const savedUser=await newUser.save();

        await sendEmail(email,"VERIFY", savedUser._id);
        
        return NextResponse.json({message:"user created successfuuly",success:true,user:savedUser})


    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}

