import {
	GoogleSignin,
	GoogleSigninButton,
	User
} from '@react-native-google-signin/google-signin';
import { Button, View } from 'react-native';
import axios from 'axios';
import { testProtected } from '../utils/helper';


interface SignInButtonProp {
	setUserInfo: Function,
	setAccessTokenToVault: Function
}

interface SignOutButtonProp {
	setUserInfo: Function,
	setAccessTokenToVault: Function
}

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