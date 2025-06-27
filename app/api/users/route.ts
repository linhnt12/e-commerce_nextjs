import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
	await dbConnect();

	try {
		const body = await request.json();
		const hashedPassword = await bcrypt.hash(body.password, 10);

		await User.create({ ...body, password: hashedPassword });
		return NextResponse.json({ message: "User created successfully" });
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 500 });
	}
}