export interface Product {
	_id: string;
	title: string;
	product_category_id: string;
	description?: string;
	price?: number;
	discountPercentage?: number;
	stock?: number;
	thumbnail?: string;
	status?: string;
	feature?: string;
	position?: number;
	slug?: string;
	createdBy?: {
		account_id: string;
		createdAt: Date;
	};
	deleted?: boolean;
	deletedBy?: {
		account_id: string;
		deletedAt: Date;
	};
	updatedBy?: {
		account_id: string;
		updatedAt: Date;
	};
	updatedAt?: Date;
	createdAt?: Date;
}