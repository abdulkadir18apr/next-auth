"use client"

import { useAuthContext } from "@/context/AuthContext";
import styles from "@/styles/login.module.scss";
import { sign } from "crypto";
import { Query } from "mongoose";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignupPage(){
    const {signup,state,credentials,setCredentials}=useAuthContext();
    const router=useRouter();

    const [showPassword,setShowPassword]=useState(false)
    



    const handleInputChange=(e:any)=>{

        setCredentials((prev:any)=>({...prev,[e.target.name]:e.target.value}))
    }

    const onSignup=async()=>{
        try{
            if(credentials.name.length>0 && credentials.email.length>0 && credentials.password.length>0){ 
                const res=await signup(credentials.name,credentials.email,credentials.password);
                toast.success("signup success");
                if(res.success){
                    setCredentials({name:"",email:"",password:""})
                    router.push(`/verifyemail`);
                }
            }
        }catch(err:any){
            console.log(err);
            toast.error("signup failed")
        }
    
    }
    return (
        <div className={styles.loginContainer}>
            <div className={styles.login}>
                <h1>Create your account</h1>
                
                <div className={styles.form}>
                <div className={styles.feild}>
                        <label htmlFor="name">Name</label>
                        <input type="name" name="name" id="name" placeholder="Name" value={credentials.name} onChange={handleInputChange} />
                    </div>
                    <div className={styles.feild}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="Email" value={credentials.email} onChange={handleInputChange} />
                    </div>
                    <div className={styles.feild}>
                        <label htmlFor="password">Password</label>
                        <input type={showPassword?"text":"password"} name="password" id="password" placeholder="Password" value={credentials.password} onChange={handleInputChange} />
                        <span onClick={()=>setShowPassword((prev)=>!prev)}>{showPassword?"hide":"show"}</span>
                    </div>
                    <button className={styles.loginBtn} onClick={onSignup}>Create Account</button>
                    <div className={styles.line}></div>
                    <p>Have an Account? <Link href="/login">Login</Link></p>
                </div>
            </div>
        </div>
    )
}