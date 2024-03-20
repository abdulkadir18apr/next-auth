"use client"
import { useAuthContext } from "@/context/AuthContext";
import styles from "@/styles/login.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {

    const {state,credentials,setCredentials,login}=useAuthContext();
    const router=useRouter();

    const handleInputChange=(e:any)=>{
        setCredentials((prev:any)=>({...prev,name:"",[e.target.name]:e.target.value}))
    }

    const handleLogin=async()=>{
        try{
            const res=await login(credentials.email,credentials.password);
            if(!res.success && res.message==="please verify your email"){
                router.push("/verifyemail");
            }else{
                router.push("/categories");
            }
        }catch(err:any){
            console.log(err);
            toast.error(err.message)
        }

    }
    


    const [showPassword,setShowPassword]=useState(false)
    return (
        <div className={styles.loginContainer}>
            <div className={styles.login}>
                <h1>Login</h1>
                <div className={styles.loginHeader}>
                    <h2>Welcome Back To Ecommerce</h2>
                    <h4>The next gen bunisess market place</h4>
                </div>
                <div className={styles.form}>
                    <div className={styles.feild}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="Email" value={credentials.email} onChange={handleInputChange}  />
                    </div>
                    <div className={styles.feild}>
                        <label htmlFor="password">Password</label>
                        <input type={showPassword?"text":"password"} name="password" id="password" placeholder="Password" value={credentials.password} onChange={handleInputChange} />
                        <span onClick={()=>setShowPassword((prev)=>!prev)}>{showPassword?"hide":"show"}</span>
                    </div>
                    <button className={styles.loginBtn} onClick={handleLogin}>Login</button>
                    <div className={styles.line}></div>
                    <p>Don&apos;t Have an Account? <Link href="/signup">SignUp</Link></p>
                </div>
            </div>
        </div>
    )
}