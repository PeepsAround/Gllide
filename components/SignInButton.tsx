import {
	GoogleSignin,
	GoogleSigninButton,
	User
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { Button, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';


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

export function SignInButton(signInButtonProp: SignInButtonProp) {
	const { setUserInfo, setAccessTokenToVault } = signInButtonProp;

	const backendURL = process.env.EXPO_PUBLIC_BACKEND_URL || "";
	const loginEndPoint = process.env.EXPO_PUBLIC_LOGIN_END_POINT || "";
	const loginURL = backendURL + loginEndPoint;

	const signIn = async () => {
		try {

			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			setUserInfo(userInfo);

			if (userInfo != null) {
				await userSignIn(userInfo);
			}

		} catch (error) {
			console.log("Error :", error);
		}
	};

	const userSignIn = async (userInfo: User) => {
		try {
			const response = await axios.post(loginURL, userInfo.user, { headers: { "Authorization": `Bearer ${userInfo.idToken}` } });
			setAccessTokenToVault(response.data.token);

			//await testProtected();
		} catch (error) {
			console.log("Error :", error);
		}
	};

	return (
		<View>
			<GoogleSigninButton
			size={GoogleSigninButton.Size.Wide}
			color={GoogleSigninButton.Color.Dark}
			onPress={signIn} />
			<Button title='Test Protected API' onPress={testProtected}></Button>
		</View>
	)
};