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

export const getProductCategoryByParentId = async (parentId: string) => {
	const res = await fetch(`/api/product-categories`);
	const data = await res.json();

	return data.map((category: ProductCategory) => category.parent_id === parentId ? category
		: null
	);
};

export const getParentCategory = async () => {
	const res = await fetch(`/api/product-categories`);
	const data = await res.json();

	return data.map((category: ProductCategory) => category.parent_id === '' ? category : null);
};