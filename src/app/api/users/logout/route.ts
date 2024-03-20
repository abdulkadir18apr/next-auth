import {NextResponse} from "next/server";

export async function GET(){
    try{
        const response=NextResponse.json({message:"logout Successfully",success:true});
        response.cookies.set("token","",{httpOnly:true});
        return response;
    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}
