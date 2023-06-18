import axios, { AxiosInstance } from 'axios';

const baseURL = 'http://localhost:3000/api';

const http: AxiosInstance = axios.create({
	baseURL: baseURL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
	timeout: 20000,
});

http.interceptors.response.use(
	response => response,
	async (error) => {
		const prevRequest = error?.config;

		// Prevent retrying if it's a /auth/refresh-token request
		if (prevRequest?.url === '/auth/refresh-token') {
			return Promise.reject(error);
		}

		if (error?.response?.status === 401 && !prevRequest?._retry) {
			prevRequest._retry = true;
			await http.post('/auth/refresh-token');
			return http(prevRequest);
		}

		return Promise.reject(error);
	}
);

export default http;