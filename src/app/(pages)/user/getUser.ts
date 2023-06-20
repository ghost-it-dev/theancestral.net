import http from '../../requests/http';
import { User } from '../../types/User';

const getPosts = async (): Promise<User> => {
	try {
		const response = await http('/user', { method: 'GET' });
		return response
	} catch (error) {
		throw error;
	}
};

export default getPosts;