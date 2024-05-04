import React from 'react';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useSession } from '@/contexts/authContext';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';

GoogleSignin.configure({
	webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
	iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
});

export default function Login() {
	const { signIn } = useSession();

	return (
		<View style={styles.container}>
			<GoogleSigninButton
				size={GoogleSigninButton.Size.Standard}
				color={GoogleSigninButton.Color.Dark}
				onPress={async () => {
					await signIn();
					router.replace('/');
				}} 
			/>
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