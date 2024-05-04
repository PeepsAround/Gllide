import React, { useEffect, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useColorScheme, View, StyleSheet, Text } from 'react-native';
import { SignInButton } from '@/components/SignInButton';
import { SignOutButton } from '@/components/SignOutButton';
import { axiosInstance, deleteValueForKey, getValueForKey, saveValueForKey } from '@/utils/helper';

interface SignInButtonProp {
	setUserInfo: Function,
	setAccessTokenToVault: Function
}

interface SignOutButtonProp {
	setUserInfo: Function,
	setAccessTokenToVault: Function
}

GoogleSignin.configure({
	webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
	iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
});

export default function Login() {

	const colorScheme = useColorScheme();
	const [userInfo, setUserInfo] = useState<{ userInfo: any }>({ userInfo: null });
	const [accessToken, setAccessToken] = useState<{ accessToken: string | null }>({ accessToken: null });


	async function getAccessToken() {
		const accessToken = await getValueForKey("accessToken");
		setAccessToken({ accessToken: accessToken });
	}

	async function setAccessTokenToVault(token: string) {
		try {
			setAccessToken({ accessToken: token });
			if (token == null)
				await deleteValueForKey("accessToken");
			else
				await saveValueForKey("accessToken", token);
			axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + token;
		}
		catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		getAccessToken();
	}, []);

	const signInButtonProp: SignInButtonProp = {
		setUserInfo: setUserInfo,
		setAccessTokenToVault: setAccessTokenToVault
	}

	const signOutButtonProp: SignOutButtonProp = {
		setUserInfo: setUserInfo,
		setAccessTokenToVault: setAccessTokenToVault
	}

	return (
		<View style={styles.container}>
			{accessToken?.accessToken == null ? (
				<SignInButton {...signInButtonProp}/>
			) : (
				<SignOutButton {...signOutButtonProp} />
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
	},
});