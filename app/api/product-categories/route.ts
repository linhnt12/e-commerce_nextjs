import dbConnect from "@/lib/mongodb";
import ProductCategory from "@/models/ProductCategory";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	await dbConnect();

	try {
		const productCategories = await ProductCategory.find({}).sort({
			createdAt: "desc"
		});
		return NextResponse.json(productCategories);
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	await dbConnect();

	try {
		const body = await request.json();
		const productCategory = await ProductCategory.create(body);
		return NextResponse.json(productCategory);
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 500 });
	}
}

export async function PUT(request: NextRequest) {
	await dbConnect();

	try {
		const body = await request.json();
		const productCategory = await ProductCategory.findByIdAndUpdate(body._id, body, { new: true });
		return NextResponse.json(productCategory);
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest) {
	await dbConnect();

	try {
		const body = await request.json();
		const productCategory = await ProductCategory.findByIdAndDelete(body._id);
		return NextResponse.json(productCategory);
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 500 });
	}
}