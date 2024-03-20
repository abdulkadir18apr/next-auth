import { NextResponse,NextRequest } from "next/server";
import {getDataFromToken} from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import Interests from "@/models/interest.model"
import { connect } from "@/dbconfig/dbconfig";


connect();

export async function GET(request:NextRequest){
    try{    
      
        const userId=await getDataFromToken(request);
        
        const interests=await Interests.findOne({userId:userId})

        return NextResponse.json({message:"interest Found",success:true,interests})

    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }

}

export async function POST(request:NextRequest){
    try{
        const reqBody=await request.json();
        const {userId,interests}=reqBody;

        const userInterest=await Interests.findOne({userId});
        if(!userInterest){
            const savedInterest=await new Interests({
                userId:userId,
                interests:interests
            }).save();
            return NextResponse.json({success:true,interests:savedInterest.interests,message:"interest Saved"});

        }else{
            userInterest.interests=interests;
            await userInterest.save();
            return NextResponse.json({success:true,interests:userInterest.interests,message:"interest Saved"});

        }
        
       
    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }

}

