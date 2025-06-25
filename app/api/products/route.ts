import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { FilterQuery } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	await dbConnect();

	const { searchParams } = new URL(request.url);
	const search = searchParams.get('search');
	const status = searchParams.get('status');
	const sort = searchParams.get('sort');
	const order = searchParams.get('order');
	const startDate = searchParams.get('startDate');
	const endDate = searchParams.get('endDate');

	const query: FilterQuery<typeof Product> = {};

	if (search) {
		query.title = { $regex: search, $options: 'i' };
	}

	if (status) {
		query.status = status;
	}

	if (startDate && endDate) {
		query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
	}

	const sortField = sort || 'createdAt';
	const sortOrder = order === 'asc' ? 1 : -1;

	try {
		const products = await Product.find({
			...query,
		}).sort({
			[sortField]: sortOrder,
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

export async function PUT(request: NextRequest) {
	await dbConnect();

	try {
		const body = await request.json();
		const product = await Product.updateMany({ _id: { $in: body.ids } }, { status: body.status });
		return NextResponse.json(product);
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest) {
	await dbConnect();

	try {
		const body = await request.json();
		const products = await Product.deleteMany({ _id: { $in: body.ids } });
		return NextResponse.json(products);
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 500 });
	}
}