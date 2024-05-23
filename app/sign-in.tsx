import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { StyleSheet, View } from 'react-native';

import React from 'react';
import { router } from 'expo-router';
import { useSession } from '@/contexts/authContext';

GoogleSignin.configure({
	webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
	iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
});

export default function Login() {
	const { signIn, signOut } = useSession();

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<GoogleSigninButton
					size={GoogleSigninButton.Size.Standard}
					color={GoogleSigninButton.Color.Dark}
					onPress={async () => {
						await signOut();
						await signIn();
						router.replace('/');
					}}
				/>
			</View>
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
	innerContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
	}
});