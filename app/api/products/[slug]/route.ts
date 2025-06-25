import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const slug = request.nextUrl.pathname.split('/').pop();

	await dbConnect();

	try {
		const product = await Product.findOne({ slug });
		return NextResponse.json(product);
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 500 });
	}
}

export async function PUT(request: NextRequest) {
	const slug = request.nextUrl.pathname.split('/').pop();

	await dbConnect();

	try {
		const body = await request.json();
		const product = await Product.findOneAndUpdate({ slug }, body, { new: true });
		return NextResponse.json(product);
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest) {
	const slug = request.nextUrl.pathname.split('/').pop();

	await dbConnect();

	try {
		const product = await Product.findOneAndDelete({ slug });
		if (!product) {
			return NextResponse.json({ message: 'Product not found' }, { status: 404 });
		}
		return NextResponse.json(product);
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 500 });
	}
}	