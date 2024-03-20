"use client"

import { Reducer } from "react";

type Action = { type: string; payload?: any };

interface User{
    userName: string;
    email: string;
    password: string;
    isVerified: boolean;
    isAdmin: boolean;
    forgotPasswordToken?: string;
    forgotPasswordExpiry?: Date;
    verifyToken?: string;
    verifyTokenExpiry?: Date;
}

interface State{
    isLoading:boolean;
    error:any;
    isAuthenticated:boolean;
    user:User | null
    interest:string[] | null
}

export const AuthReducer = (state:State, action:Action):State => {
    const { type, payload } = action
    switch (type) {
        case 'SET_LOADING':
            return {...state,isLoading:true}
        case 'SET_LOGOUT':
            return {...state,isLoading:false,isAuthenticated:false,user:null}
        case'SET_ERROR':
                return {...state,isLoading:false,error:payload}
        case "SET_LOGIN":
            return {...state,isAuthenticated:true,isLoading:false,}
        case "SET_USER":
            return {...state,isAuthenticated:true,isLoading:false,user:payload}
        case "SET_INTEREST":
            return {
                ...state,interest:payload
            }
        default:
            return state;
    }

}