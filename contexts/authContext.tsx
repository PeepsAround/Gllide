import React from 'react';
import { createContext, useContext } from 'react';
import { useStorageState } from '@/hooks/useStorageState';
import {
	GoogleSignin
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { setAuthHeader } from '@/utils/helper';

const AuthContext = createContext<{
	signIn: () => void;
	signOut: () => void;
	session?: string | null;
	isLoading: boolean;
}>({
	signIn: () => null,
	signOut: () => null,
	session: null,
	isLoading: false,
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

			return response.data.token;
		}
	} catch (error) {
		console.log("Error :", error);
	}
	return null;
};


export function SessionProvider(props: React.PropsWithChildren) {
	const [[isLoading, session], setSession] = useStorageState('session');
	
	return (
		<AuthContext.Provider
			value={{
				signIn: async () => {
					const token = await signIn();
					setSession(token);
					setAuthHeader(token);
				},
				signOut: async() => {
					setSession(null);
					setAuthHeader(null);
					await GoogleSignin.signOut();
				},
				session,
				isLoading,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
}