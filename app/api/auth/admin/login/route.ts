import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	await dbConnect();

	const body = await request.json();
	const { email, password } = body;

	const user = await User.findOne({ email });

	if (!user) {
		return NextResponse.json({ message: "User not found" }, { status: 404 });
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
	}

	const token = sign({ id: user._id, role: 'admin' }, process.env.JWT_SECRET!, { expiresIn: '7d' });

	const response = NextResponse.json({ message: 'Login successful' });
	response.cookies.set('token', token, {
		httpOnly: true,
		path: '/',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 7 * 24 * 60 * 60,
	});

	return response;
}