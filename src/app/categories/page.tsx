"use client"


import { Pagination } from "@/components/Pagination";
import styles from "@/styles/categories.module.scss";
import { useEffect, useState } from "react";
import { categories } from "@/helpers/catagories";
import { usePagination } from "@/helpers/usePagination";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "@/context/AuthContext";

export default function CategoriesPage() {

    const [selectedCategory,setSelectedCategory]=useState<string[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryData, setCategoryData] = useState<string[]>([]);
    const [totalPage, startIndex, endIndex, changePage] = usePagination(categories.length, 4)

    const {state,getUser,fetchInterest,updateInterest}=useAuthContext();




    const setUser=async()=>{
        try{
            const res=await getUser();
            if(res.success){
                toast.success(`welcome ${res?.user?.email}`);
            }
          

        }catch(err:any){
            console.log(err);
            toast.error("Error in fetching data",err.message)
        }
    }


    const getuserInterest=async()=>{
        try{
            const res=await fetchInterest();
            console.log(res);
            if(res.success){
                if(res.interests!==null){
                    setSelectedCategory([...res.interests?.interests])
                } else{
                    toast.success("please select interest")
                }
            }
        }catch(err:any){
            console.log(err);
            toast.error("Error in fetching Interest Data",err.message)
        }
    }

    const getCurrentData = () => {
        const currentData = [];
        for (let i: number = startIndex; i <= endIndex; i++) {
            currentData.push(categories[i])
        }
        return currentData
    }

    useEffect(() => {
        const currentData = getCurrentData();
        setCategoryData(currentData)
    }, [startIndex, endIndex])

    useEffect(() => {
        const currentData = getCurrentData();
        setCategoryData(currentData);
        setUser();
        getuserInterest();
    }, [])

    useEffect(() => {
        changePage(currentPage)
    }, [currentPage])


    const handleupdateClick=async()=>{
        try{

            const res=await updateInterest(selectedCategory);
            if(res.success){
                toast("Interest Saved Successfully")
            }

        }catch(err:any){
            console.log(err);
            toast.error("Error in updating Interest Data",err.message)
        }
    }

    const handleCategoryInputChange=(e:any)=>{
        if(e.target.checked){
            setSelectedCategory([...selectedCategory,e.target.value])
        }else{
            if(selectedCategory.includes(e.target.value)){
                setSelectedCategory((prev)=>prev.filter((item)=>item!==e.target.value))
            }
        }
    }
  
    const handleCheck=(value:string)=>{
        if(selectedCategory.includes(value)){
            return true
        }else{
            return false
        }
    }


    return (
        <div className={styles.categoryContainer}>
            <div className={styles.category}>
                <div className={styles.header}>
                    <h1>Please Mark your Interest</h1>
                    <h5>we will keep you notified</h5>
                </div>
                <div className={styles.listContainer}>
                    <p>My Saved Interest</p>
                    <ul>
                        {
                            categoryData.map((value, i) => (
                                <li key={value}>
                                    <input type="checkbox" name={value} id={value} value={value} onChange={handleCategoryInputChange} checked={handleCheck(value)}/>
                                    <label htmlFor={value}>{value}</label>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className={styles.paginationContainer}>
                    <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={setCurrentPage} />
                </div>
                <button className={styles.updateBtn} onClick={handleupdateClick}>Update</button>
            </div>

        </div>
    )
}