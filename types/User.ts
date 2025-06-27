export interface User {
	_id: string;
	fullName: string;
	email: string;
	password: string;
	phone: string;
	address: string;
	avatar: string;
	birthday: Date;
	role: string;
	updatedAt?: Date;
	createdAt?: Date;
}