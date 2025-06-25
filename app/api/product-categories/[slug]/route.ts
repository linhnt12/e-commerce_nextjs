import dbConnect from "@/lib/mongodb";
import ProductCategory from "@/models/ProductCategory";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	await dbConnect();

	const slug = request.nextUrl.pathname.split('/').pop();

	try {
		const productCategory = await ProductCategory.findOne({ slug });
		if (!productCategory) {
			return NextResponse.json({ message: 'Product category not found' }, { status: 404 });
		}
		return NextResponse.json(productCategory);
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 500 });
	}
}

export async function PUT(request: NextRequest) {
	const slug = request.nextUrl.pathname.split('/').pop();

	await dbConnect();

	try {
		const body = await request.json();
		const productCategory = await ProductCategory.findOneAndUpdate({ slug }, body, { new: true });
		return NextResponse.json(productCategory);
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest) {
	const slug = request.nextUrl.pathname.split('/').pop();

	await dbConnect();

	try {
		const productCategory = await ProductCategory.findOneAndDelete({ slug });
		return NextResponse.json(productCategory);
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 500 });
	}
}