import { axiosInstance, setAxiosAuthHeader } from '../helper/axiosHelper';
import { createContext, useContext } from 'react';

import {
	GoogleSignin
} from '@react-native-google-signin/google-signin';
import { LoginDTO } from '@/models/loginDTO';
import React from 'react';
import axios from 'axios';
import { useStorageState } from '@/hooks/useStorageState';

export const AuthContext = createContext<{
	signIn: () => void;
	signOut: () => void;
	session?: string | null;
	isLoading: boolean;
	userId?: string | null;
}>({
	signIn: () => null,
	signOut: () => null,
	session: null,
	isLoading: false,
	userId: null
});

// This hook can be used to access the user info.
export function useSession() {
	const value = useContext(AuthContext);
	if (process.env.NODE_ENV !== 'production') {
		if (!value) {
			throw new Error('useSession must be wrapped in a <SessionProvider />');
		}
	}

	return value;
}

const signIn = async () => {
	try {

		const backendURL = process.env.EXPO_PUBLIC_BACKEND_URL || "";
		const loginEndPoint = process.env.EXPO_PUBLIC_LOGIN_END_POINT || "";
		const loginURL = backendURL + loginEndPoint;

		await GoogleSignin.hasPlayServices();
		const userInfo = await GoogleSignin.signIn();

		if (userInfo != null) {
			const response = await axios.post(loginURL, userInfo.user, { headers: { "Authorization": `Bearer ${userInfo.idToken}` } });

			return response.data;
		}
	} catch (error) {
		console.log("Error :", error);
		alert(`Error : ${error}`);
	}
	return null;
};

export function SessionProvider(props: React.PropsWithChildren) {
	const [[isLoading, session], setSession] = useStorageState('session');
	const [[_, userId], setUserId] = useStorageState('userId');
	
	return (
		<AuthContext.Provider
			value={{
				signIn: async () => {
					const data: LoginDTO = await signIn();
					setSession(data.jwtToken);
					setUserId(data.userId);
					setAxiosAuthHeader(data.jwtToken);
				},
				signOut: async() => {
					setSession(null);
					setUserId(null);
					setAxiosAuthHeader(null);
					await GoogleSignin.signOut();
				},
				session,
				isLoading,
				userId
			}}>
			{props.children}
		</AuthContext.Provider>
	);
}