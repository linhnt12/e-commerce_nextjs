import { ProductCategory } from '@/types/ProductCategory';

export const getProductCategoriesOptions = async (exclude: string[] = []) => {
	const res = await fetch(`/api/product-categories?exclude=${exclude.join(',')}`);
	const data = await res.json();

	return data.map((category: ProductCategory) => ({
		label: category.title,
		value: category._id,
		slug: category.slug,
	}));
};