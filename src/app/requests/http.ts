const baseURL = 'http://localhost:3000/api';

async function http(url: string, options: any) {
	options = {
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
		...options
	};

	let response = await fetch(baseURL + url, options);

	if (!response.ok) {
		if (response.status === 401 && !options._retry && url !== '/auth/refresh-token') {
			options._retry = true;
			await http('/auth/refresh-token', { method: 'POST' });
			response = await http(url, options);
		} else {
			throw new Error(await response.text());
		}
	}
	return response.json();
}

export default http;