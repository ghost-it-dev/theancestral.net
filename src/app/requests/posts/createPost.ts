import { mutate } from 'swr';
import http from '../http';

export default async (title: string, description: string, tags: string[], publicPost: boolean) => {
	try {
		await http.post('/posts', {
			title,
			description,
			tags,
			publicPost
		});
		mutate('/posts');
	} catch (err) {
		return console.log(err);
	}
}