export interface ProductCategory {
	_id: string;
	title: string;
	parent_id?: string;
	description?: string;
	thumbnail?: string;
	status?: string;
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