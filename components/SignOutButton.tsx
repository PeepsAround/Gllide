import {  Button, View } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { testProtected } from '@/utils/helper';

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
		<View>
			<Button title='Log Out' onPress={signOut}></Button>
			<View style={{ marginBottom: 10 }} />
			<Button title='Test Protected API' onPress={testProtected}></Button>
		</View>
	)
}