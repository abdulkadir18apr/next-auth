
"use client"

import styles from "@/styles/header.module.scss";
import "@/styles/variables.scss";
import Image from "next/image";
import CustomIcon from "./Icon"
import { useAuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Header() {
    
    const {state,logout}=useAuthContext();

    const router=useRouter();


    const handleLogout=async()=>{
        try{
            const res=await logout();
            router.push("/login")

        }catch(err:any){
            toast.error("something went wrong")
        }

    }

    return <div className={styles.headerContainer}>
        <div className={styles.settings}>
            <ul >
                <li>Help</li>
                <li>Orders & Returns</li>
                <li>Welcome</li>
                 {
                    state?.isAuthenticated && <li onClick={handleLogout}>logout</li>

                 }
            </ul>

        </div>



        <div className={styles.menu}>
            <h1>ECOMMERCE</h1>
            <ul>
                <li>Categories</li>
                <li>Sale</li>
                <li>Clearance</li>
                <li>New Stock</li>
                <li>Trending</li>
            </ul>
            <div className={styles.icons}>
                <CustomIcon icon="eva:search-outline" size="36" color="gray" />
                <CustomIcon icon="eva:shopping-bag-outline" size="36" color="gray" />


            </div>
        </div>


        <div className={styles.headerDiscount}>
            <CustomIcon icon="eva:arrow-ios-back-outline" size="24" color="black" />
            <p>Get 10% off on bunisess signup</p>
            <CustomIcon icon="eva:arrow-ios-forward-outline" size="24" color="black" />

        </div>
    </div>
}
