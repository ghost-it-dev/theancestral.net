import useSWR from 'swr';
import { User } from '../../types/User';
import http from '../http';

export default () => {
	return useSWR<User>(
		'/user',
		async () => {
			const res = await http.get('/user');
			return res.data;
		}, { revalidateOnFocus: false }
	);
};