import { Post } from '../../types/Post';
import http from '../http';

const getPosts = async (): Promise<Post[]> => {
	try {
		const response = await http('/posts', { method: 'GET' });
		return response
	} catch (error) {
		throw error;
	}
};

export default getPosts;