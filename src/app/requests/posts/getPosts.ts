import { Post } from '../../types/Post';
import http from '../http';

const getPosts = async (): Promise<Post[]> => {
	try {
		const response = await http('/posts', { method: 'GET' });
		const posts = response as Post[];

		(async () => {
			console.log(posts);
		})();

		return posts;
	} catch (error) {
		// Handle error here
		console.error('Error fetching posts:', error);
		throw error;
	}
};

export default getPosts;