// store/axios.ts

import axios from "axios";

// Set the base URL for backend
axios.defaults.baseURL = process.env.backendUrl || 'https://cank256.pythonanywhere.com/'

// Set up Axios interceptors for CORS
axios.interceptors.request.use((config) => {
	// Include credentials (if needed)
	config.withCredentials = true;
	config.headers['Content-Type'] = 'application/json';
	config.headers['accept'] = 'application/json';

	return config;
});

export default axios;
