"use client";

import { Product } from "@/types/Product";
import { useState, useEffect } from "react";

export default function Products() {
	const [products, setProducts] = useState<Product[]>([]);
	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		const response = await fetch("/api/products");
		const data = await response.json();
		console.log(data);
		setProducts(data);
	};

	return (
		<div>
			<h1>Products</h1>
			<ul>
				{products.map((product: Product) => (
					<li key={product._id}>{product.title}</li>
				))}
			</ul>
		</div>
	);
}