"use client"

import styles from "@/styles/pagination.module.scss";
import CustomIcon from "./Icon";
import { Interface } from "readline";

interface PaginationProps {
    currentPage:number;
    totalPage:number;
    onPageChange:(page:number)=>void;
  }
  

export const Pagination:React.FC<PaginationProps> = ({ currentPage, totalPage, onPageChange }) => {

 

    const getPageNumbers = () => {
        const pageNo = []
        for (let i = 1; i <= totalPage; i++) {

            pageNo.push(<button key={i} className={currentPage === i ? styles.active : styles.pageBtn} onClick={()=>onPageChange(i)} >{i}</button>)
        }
        return pageNo
    }
    const handleBackwardClick=()=>{
        if(currentPage<=1){
            onPageChange(totalPage);
        }else{
            onPageChange(currentPage-1)
        }
    }

    return (
        <div className={styles.pagination}>

            <button onClick={() => onPageChange(1)}>

                <CustomIcon icon="bi:chevron-double-left" size="24" color="gray" />

            </button>
            <button onClick={() => handleBackwardClick()}>
                <CustomIcon icon="eva:arrow-ios-back-outline" size="24" color="gray" />
            </button>

            {
                getPageNumbers()
            }

            <button onClick={() => currentPage<totalPage?onPageChange(currentPage +1):onPageChange(1)}>
                <CustomIcon icon="eva:arrow-ios-forward-outline" size="24" color="gray" />
            </button>
            <button onClick={()=>onPageChange(totalPage)}>
                <CustomIcon icon="bi:chevron-double-right" size="24" color="gray" />
            </button>
        </div>
    )

}