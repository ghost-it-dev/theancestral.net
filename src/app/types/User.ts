export interface UserType {
	username: string;
	name: string;
	email: string;
	role: 'user' | 'admin';
	_id: string;
	postAmount: number;
}