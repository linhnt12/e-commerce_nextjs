import dbConnect from '@/lib/mongodb';
import ProductCategory from '@/models/ProductCategory';
import { FilterQuery } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	await dbConnect();

	const { searchParams } = new URL(request.url);
	const exclude = searchParams.get('exclude');
	const search = searchParams.get('search');
	const status = searchParams.get('status');
	const sort = searchParams.get('sort');
	const order = searchParams.get('order');
	const startDate = searchParams.get('startDate');
	const endDate = searchParams.get('endDate');

	const query: FilterQuery<typeof ProductCategory> = {};

	if (exclude) {
		query.slug = { $ne: exclude };
	}

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
		const productCategories = await ProductCategory.find({
			...query,
		}).sort({
			[sortField]: sortOrder,
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
		const productCategory = await ProductCategory.updateMany({ _id: { $in: body.ids } }, { status: body.status });
		return NextResponse.json(productCategory);
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest) {
	await dbConnect();

	try {
		const body = await request.json();
		const productCategory = await ProductCategory.deleteMany({ _id: { $in: body.ids } });
		return NextResponse.json(productCategory);
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 500 });
	}
}