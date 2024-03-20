"use client"

import { useAuthContext } from "@/context/AuthContext";
import styles from "@/styles/verify.module.scss";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";


export default function VerifyEmailPage(){

    const [userCode,setUserCode]=useState<{[key:number]:string}>({1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:""})
    const [isloading,setIsLoading]=useState(false);

    const {verifyEmail,credentials}=useAuthContext()
    const router=useRouter();
    const inputRefs=useRef<HTMLInputElement[]>([])

   
    useEffect(()=>{
        if(credentials.email.length===0){
            router.push("/login")
        }
    },[credentials])



    const handleVerifyOtp=async()=>{


        setIsLoading(true)
        
        let otp=Object.keys(userCode).reduce((acc,key:any)=>acc+userCode[key],"");
        try{
            (true)
            const res=await verifyEmail(credentials.email,otp,undefined);
        
            if(res.success){
                toast.success("verification success");
                setTimeout(()=>{
                    router.push("/login")
                },2000)
                
            }

        }catch(err:any){
            console.log(err);
            toast.error("Invalid otp")
        }finally{
            setIsLoading(false)
        }
    }
    const focusNextInput = (currentInput: HTMLInputElement | null, nextInput: HTMLInputElement | null) => {
        if (currentInput && nextInput && currentInput.value.length === 1) {
            nextInput.focus();
        }
    };

    const handleInputChange=(e:any,key:string,i:number)=>{
      
        setUserCode((prev)=>({...prev,[key]:e.target.value}));
        focusNextInput(inputRefs.current[i], inputRefs.current[i + 1]);


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
                             <input type="text" name="digit" id="code"  key={key} value={userCode[key]} onChange={(e:any)=>handleInputChange(e,key,i)} ref={(el)=>(inputRefs.current[i]=el as HTMLInputElement)} />
                        ))}
                       
                    </div>
                    
                </div>
                <button className={styles.loginBtn} onClick={handleVerifyOtp}>{isloading?"loading...":"Verify"}</button>
            </div>
        </div>
    )
}