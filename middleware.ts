import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const token = request.cookies.get('token')?.value;
	const { pathname } = request.nextUrl;

	if (pathname.startsWith('/admin/auth')) {
		return NextResponse.next();
	}

	if (!token) {
		return NextResponse.redirect(new URL('/admin/auth/login', request.url))
	}

	try {
		const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
		await jwtVerify(token, secret);
		return NextResponse.next();
	} catch (error) {
		console.log(error)
		return NextResponse.redirect(new URL('/admin/auth/login', request.url));
	}
}

export const config = {
	matcher: ['/admin/:path*'],
};
