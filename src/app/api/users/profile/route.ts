import { NextResponse,NextRequest } from "next/server";
import {getDataFromToken} from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";


connect();

export async function GET(request:NextRequest){
    try{    
      
        const userId=await getDataFromToken(request);
        
        const user=await User.findOne({_id:userId}).select('-password')

        return NextResponse.json({message:"user Found",success:true,user})

    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }

}

