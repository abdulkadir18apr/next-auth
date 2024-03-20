import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
    
    const path=request.nextUrl.pathname;
    const isPublic=path==="/login" || path==="/signup" || "/verifyemail";
    
    const token = request.cookies.get('token')?.value || "";

    if(path==="/" && token===""){
        return NextResponse.redirect(new URL("/login",request.nextUrl))
    }
    if(path==="/" && token){
        return NextResponse.redirect(new URL("/categories",request.nextUrl))
    
    }
        
    if(isPublic && token){
        return NextResponse.redirect(new URL("/category",request.nextUrl))
    }
    if(!isPublic && !token){
        return NextResponse.redirect(new URL("/login",request.nextUrl))
    }

}
 

export const config = {
  matcher:[
    '/',
    '/category',
    '/login',
    '/signup',
    '/verifyemail'
  ]
}