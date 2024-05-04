import {  Button, View, StyleSheet } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

interface SignOutButtonProp {
	setUserInfo: Function,
	setAccessTokenToVault: Function
}

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
		<View style={styles.container}>
			<Button title='Log Out' onPress={signOut}></Button>
			<View style={{ marginBottom: 10 }} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: 'white',
	},
});