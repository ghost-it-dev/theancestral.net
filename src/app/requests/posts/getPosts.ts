import useSWR from 'swr';
import { Post } from '../../types/Post';
import http from '../http';

export default () => {
	return useSWR<Post[]>(
		'/posts',
		async () => {
			const res = await http.get('/posts');
			return res.data;
		}
	);
};