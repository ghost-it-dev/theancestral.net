export interface UserTypes {
	username: string;
	name: string;
	email: string;
	role: 'user' | 'admin';
	_id: string;
	postAmount: number;
	loggedIn: boolean;
}