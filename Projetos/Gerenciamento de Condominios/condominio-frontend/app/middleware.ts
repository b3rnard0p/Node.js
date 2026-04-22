import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from "js-cookie";
export function middleware(req: NextRequest) {
 const token = req.cookies.get("token");
 if (!token && req.nextUrl.pathname.startsWith("/")) {
 return NextResponse.redirect(new URL("/login", req.url));
 }
}
