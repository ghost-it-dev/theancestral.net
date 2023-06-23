export interface UserType {
	username: string;
	name: string;
	email: string;
	role: 'user' | 'admin' | 'guest';
	_id: string;
	postAmount: number;
}