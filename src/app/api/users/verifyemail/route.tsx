import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';
import { connect } from "@/dbconfig/dbconfig";

connect();
export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const otp = reqBody?.otp
        const email = reqBody.email
        const token = reqBody?.token;
        console.log(email,otp);
        if (otp) {
            const user = await User.findOne({ email: email });
            if (!user) {
                return NextResponse.json({ message: "user Not found" ,success:false}, { status: 400 });
            }
            const isOtpValid = await bcryptjs.compare(otp, user.verifyToken);
            if (!isOtpValid) {
                return NextResponse.json({ message:"Invalid OTP" ,success:false} ,{ status: 400 })
            }
            user.isVerified = true;
            user.verifyToken = undefined
            user.verifyTokenExpiry = undefined;
            await user.save();
            console.log(user);

        } else {
            const user = await User.findOne({ email: email, verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
            if (!user) {
                return NextResponse.json({ message: "OTP EXPIRED", success:false }, { status: 400 });
            }
            user.isVerified = true;
            user.verifyToken = undefined
            user.verifyTokenExpiry = undefined;
            await user.save();
            console.log(user);

        }
       
        return NextResponse.json({ message: "Email Verified", success: true }, { status: 200 });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}