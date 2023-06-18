import useSWR from 'swr';
import { Post } from '../../types/Post';
import http from '../http';

export default (_id: string) => {
	return useSWR<Post>(
		`/post/${_id}`,
		async () => {
			const res = await http.get(`/post/${_id}`);
			return res.data;
		}
	);
};