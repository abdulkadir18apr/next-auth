import nodemailer from 'nodemailer';
import User from "@/models/userModel"
import bcrypyjs from 'bcryptjs';
import CryptoJS from 'crypto-js';



export async function updateToken(userId: string, token: string, emailType: string) {
    try {
        if (emailType === 'VERIFY') {
            const res = await User.findByIdAndUpdate(userId, { verifyToken: token, verifyTokenExpiry: Date.now() + 3600000 });
            return true
        } else if (emailType === "RESET") {
            const res = await User.findByIdAndUpdate(userId, { forgotPasswordToken: token, forgotPasswordExpiry: Date.now() + 3600000 });
            return true
        }
    } catch (err) {
        throw new Error("Error in generating token");

    }
}


    const generateOTP = () => {
        let otp = '';
        for (let i = 0; i < 8; i++) {
            otp += Math.floor(Math.random() * 10);
        }
        return otp;
    }

  
function encryptOTP(otp: string, secretKey: string): string {
  return CryptoJS.AES.encrypt(otp, secretKey).toString();
}


    export async function sendEmail(email: any, emailType: any, userId: any) {

        try {


            const otp = generateOTP();
            const hashedToken = await bcrypyjs.hash(otp.toString(), 10);

            const encrptedOtp=encryptOTP(otp,process.env.SECRET_KEY !);


            const res = await updateToken(userId, hashedToken, emailType);

            if (res) {

                const transport = nodemailer.createTransport({
                    host: "sandbox.smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                        user: "b63c1e9fc24de1",
                        pass: "60034241cc460e"
                    }
                });

                const mailOptions = {
                    from: "abdulq314@gmail.com",
                    to: email,
                    subject: emailType === "VERIFY" ? "verify your Email" : "RESET PASSWORD",
                    html: `<p>Click on link to verify your password <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}&otp=${encryptOTP} ">Clcik here</a> OR </p>  <h2>ENTER OTP ${otp}`
                }
                const mailResponse = await transport.sendMail(mailOptions);
                return mailResponse

            }
        }catch (err: any) {
            throw new Error(err.message)
        }
    }