"use client"

import { useAuthContext } from "@/context/AuthContext";
import styles from "@/styles/verify.module.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function VerifyEmailPage(){

    const [userCode,setUserCode]=useState<{[key:number]:string}>({1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:""})
    const {verifyEmail,credentials}=useAuthContext()
    const router=useRouter()

    console.log(credentials)

    const handleVerifyOtp=async()=>{
        
        let otp=Object.keys(userCode).reduce((acc,key:any)=>acc+userCode[key],"");
        try{
            const res=await verifyEmail(credentials.email,otp,undefined);
            if(res.success){
                toast.success("verification success");
                router.push("/login")
            }

        }catch(err:any){
            console.log(err);
            toast.error(err.message)
        }
    }
    

    return(
        <div className={styles.verifyContainer}>
            <div className={styles.verificationPage}>
                <h1>Verify your email</h1>
                <div className={styles.header}>
                    <p>Enter the 8 digit code you have received on</p>
                    <p>{credentials.email}</p>
                </div>
                <div className={styles.verificationCode}>
                    <label htmlFor="code">Code</label>
                    <div className={styles.userInputs}>
                        {Object.keys(userCode).map((key:any,i)=>(
                             <input type="text" name="digit" id="code"  key={key} value={userCode[key]} onChange={(e:any)=>setUserCode((prev)=>({...prev,[key]:e.target.value}))}/>
                        ))}
                       
                    </div>
                    
                </div>
                <button className={styles.loginBtn} onClick={handleVerifyOtp}>Verify</button>
            </div>
        </div>
    )
}