"use client"

import { createContext ,ReactNode, useContext, useReducer, useState } from "react"
import { AuthReducer } from "./AuthReducer";
import axios from "axios";

interface AuthProviderProps {
    children: ReactNode;
  }

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

const initialState:State={
    isLoading:false,
    error:null,
    isAuthenticated:false,
    user:null,
    interest:null
}

interface AuthContextValue {
    state: State;
    dispatch: React.Dispatch<any>;
    getUser:()=>Promise<any>;
    login:(email:string,password:string)=>Promise<any>;
    logout:()=>Promise<any>;
    fetchInterest:()=>Promise<any>;
    updateInterest:(interests:string[] |null )=>Promise<any>;
    signup:(name:string , email:string,password:string)=>Promise<any>;
    verifyEmail:(email:string,otp:string,token:string | undefined)=>Promise<any>;
    setCredentials:React.Dispatch<any>;
    credentials:{name:string,email:string ,password:string}
  }

const AuthContext=createContext<AuthContextValue | undefined>(undefined);


export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    const [credentials,setCredentials]=useState({name:"",email:"",password:""})


    const signup=async(name:string,email:string,password:string)=>{
      try{
        const res=await axios.post("/api/users/signup",{name,email,password});
        return res.data
      }catch(err:any){
        dispatch({type:"SET_ERROR",payload:err.message})
      }  
    }

    const verifyEmail=async(email:string,otp:string,token:string | undefined)=>{
      try{
        const res=await axios.post("/api/users/verifyemail",{email,otp,token})
        return res.data
      }catch(err:any){
        dispatch({type:"SET_ERROR",payload:err.message})
      }
    }
    const login=async(email:string,password:string)=>{
      try{
        const res=await axios.post("/api/users/login",{email,password});
        dispatch({type:"SET_LOGIN"})
        return res.data
      }catch(err:any){
        dispatch({type:"SET_ERROR",payload:err.message})
      }

    }

    const getUser=async()=>{
      try{
        const res=await axios.get("/api/users/profile");
        dispatch({type:"SET_USER",payload:res.data.user});
        return res.data
      }catch(err:any){
        dispatch({type:"SET_ERROR",payload:err.message})
      }
    }



    const logout=async()=>{
      try{
        const res=await axios.get("/api/users/logout");
        dispatch({type:"SET_LOGOUT"});
        return res.data
      }catch(err:any){
        dispatch({type:"SET_ERROR",payload:err.message})
      }
    }

    const fetchInterest=async()=>{
      try{
        const res=await axios.get("/api/users/interest");
        dispatch({type:"SET_INTEREST",payload:res.data.interests});
        return res.data

      }catch(err:any){
        dispatch({type:"SET_ERROR",payload:err.message})
      }
    }
    const updateInterest=async(interests:string[] | null)=>{
      try{
        const res=await axios.post("/api/users/interest",{interests});
        dispatch({type:"SET_INTEREST",payload:res.data.interests});
        return res.data

      }catch(err:any){
        dispatch({type:"SET_ERROR",payload:err.message})
      }
    }
  
    return (
      <AuthContext.Provider value={{ state, dispatch,getUser,login,verifyEmail,signup,logout,setCredentials,credentials,updateInterest,fetchInterest}}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuthContext must be used within an AuthProvider");
    }
    const { state=initialState, dispatch,getUser,login,verifyEmail,signup,logout,credentials,setCredentials,fetchInterest,updateInterest  } = context;
    return { state, dispatch,getUser,login,verifyEmail,signup,logout,credentials,setCredentials ,fetchInterest,updateInterest };
  };