import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	await dbConnect();

	try {
		const products = await Product.find({}).sort({
			createdAt: "desc"
		});
		return NextResponse.json(products);
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	await dbConnect();

	try {
		const body = await request.json();
		const product = await Product.create(body);
		return NextResponse.json(product);
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 500 });
	}
}