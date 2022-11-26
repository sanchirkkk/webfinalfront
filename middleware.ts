// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Cookie from "js-cookie"

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {


  let check = req.nextUrl.searchParams.get('keys')
  if (check != null && req.nextUrl.pathname.startsWith('/dashboard')){
   let checker =  req.cookies.get("Token")
   if (checker == null ){
    req.nextUrl.pathname  = '/login' 
    return NextResponse.rewrite(req.nextUrl)
  }
    const isInBeta = req.cookies.get("Token").value
  
    req.nextUrl.pathname = isInBeta == req.nextUrl.searchParams.get('keys') ? '/dashboard' : '/login'
    return NextResponse.rewrite(req.nextUrl)

  }
  else if ( req.cookies.get("Token") != null && req.nextUrl.pathname.startsWith('/login')) {
    req.nextUrl.pathname  = '/dashboard' 
    return NextResponse.rewrite(req.nextUrl)
  }  else if( req.cookies.get("Token") != null  && req.nextUrl.pathname.startsWith('/register') ){
    req.nextUrl.pathname  = '/dashboard' 
    return NextResponse.rewrite(req.nextUrl)
  } else if (req.cookies.get("Token") == null  && req.nextUrl.pathname.startsWith('/dashboard')){
    req.nextUrl.pathname  = '/login' 
    return NextResponse.rewrite(req.nextUrl)
  }
  

  
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/dashboard/:path*',
// }