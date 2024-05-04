import {  Button, Text, View } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

interface SignInButtonProp {
	setUserInfo: Function,
	setAccessTokenToVault: Function
}

interface SignOutButtonProp {
	setUserInfo: Function,
	setAccessTokenToVault: Function
}

export const axiosInstance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
	timeout: 10000, // Timeout for requests
	headers: {
		'Content-Type': 'application/json',
	},
});

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

export const testProtected = async () => {
	try {
		const response = await axiosInstance.post("/feed/protected");
		alert("Success!")
	} catch (error) {
		alert("Failure!")
		console.log("Error :", error);
	}
};

export function SignOutButton(signOutButtonProp : SignOutButtonProp){
	const { setUserInfo, setAccessTokenToVault } = signOutButtonProp;

	const signOut = async () => {
		try {
			
			await GoogleSignin.signOut();
			setUserInfo(null);
			setAccessTokenToVault(null);
		} catch (error) {
			console.error("Error :", error);
		}
	};

	return(
		<View>
			<Button title='Log Out' onPress={signOut}></Button>
			<View style={{ marginBottom: 10 }} />
			<Button title='Test Protected API' onPress={testProtected}></Button>
		</View>
	)
}