import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const axiosInstance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
	timeout: 10000, // Timeout for requests
	headers: {
		'Content-Type': 'application/json',
	},
});

export const testProtected = async () => {
	try {
		const response = await axiosInstance.post("/feed/protected");
		alert("Success!")
	} catch (error) {
		alert("Failure!")
		console.log("Error :", error);
	}
};

export async function saveValueForKey(key: string, value: string) {
	await SecureStore.setItemAsync(key, value);
}

export async function getValueForKey(key: string): Promise<string | null> {
	let result = await SecureStore.getItemAsync(key);
	return result;
}

export async function deleteValueForKey(key: string) {
	await SecureStore.deleteItemAsync(key);
}