import http from '../http';

export default () => {
	return http('/user', { method: 'GET' });
};