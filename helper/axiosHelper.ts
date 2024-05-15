import axios, { AxiosResponse } from 'axios';

import { logError } from './errorLogger';

export const axiosInstance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
	timeout: 10000, // Timeout for requests
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	},
});

export const setAxiosAuthHeader = (token: string | null) => {
	if (token) {
		setAxiosHeader("Authorization", "Bearer " + token);
		return;
	}

	setAxiosHeader("Authorization", null);
}

export const setAxiosHeader = (name: string, value: string) => {
	if (!name) return;

	axiosInstance.defaults.headers.common[name] = value;
}

export const axiosPost = async (endpoint: string, payload: any, config?: any): Promise<AxiosResponse<any, any>> => {
	try {
        // Make the POST request with the updated configuration
        const response = await axiosInstance.post(endpoint, payload, config);

        return response;
	} catch (error) {
		logError(error);
	}
}