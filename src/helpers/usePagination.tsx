"use client"

import { useState } from "react";

export const usePagination=(datalength:number,entryPerPage:number):[number,number,number,(page:number)=>void]=>{
    const totalPages=Math.floor(datalength/entryPerPage);
    const [startIndex,setStartIndex]=useState(0);
    const [endIndex,setendIndex]=useState(entryPerPage-1);


    const changePage=(page:number):void =>{
        console.log("called");

        const start_Page_Index=(entryPerPage*(page-1));
        const end_page_Index=start_Page_Index+entryPerPage-1;

        if(page<=totalPages){
            setStartIndex(start_Page_Index);
            if(end_page_Index>datalength){
                setendIndex(datalength-1);
            }else{
                setendIndex(end_page_Index);
            }
        }else{
            setStartIndex(0);
            setendIndex(entryPerPage)
        }

    }
    return [totalPages,startIndex,endIndex,changePage]
}