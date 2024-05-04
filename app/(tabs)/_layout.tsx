import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, StyleSheet } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { SignInButton } from '@/components/SignInButton';
import { SignOutButton } from '@/components/SignOutButton';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name'];
	color: string;
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

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

export default function TabLayout() {
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
			<View>
				{accessToken?.accessToken == null ? (
					<SignInButton {...signInButtonProp} />
				) : (
					<SignOutButton {...signOutButtonProp} />
				)}
			</View>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
					// Disable the static render of the header on web
					// to prevent a hydration error in React Navigation v6.
					headerShown: useClientOnlyValue(false, true),
				}}>
				<Tabs.Screen
					name="index"
					options={{
						title: 'Tab One',
						tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
						headerRight: () => (
							<Link href="/modal" asChild>
								<Pressable>
									{({ pressed }) => (
										<FontAwesome
											name="info-circle"
											size={25}
											color={Colors[colorScheme ?? 'light'].text}
											style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
										/>
									)}
								</Pressable>
							</Link>
						),
					}}
				/>
				<Tabs.Screen
					name="two"
					options={{
						title: 'Tab Two',
						tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
					}}
				/>
			</Tabs>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop:100,
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});