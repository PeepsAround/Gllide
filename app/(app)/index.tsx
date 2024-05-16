import { Redirect } from 'expo-router';
import { setAxiosAuthHeader } from '@/helper/axiosHelper';
import { useSession } from '@/contexts/authContext'

export default function Index() {
	const { signOut, session } = useSession();

	// Set the token in axiosInstance, since it won't have it after app restart
	setAxiosAuthHeader(session);
	return (
		// <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		// 	<Text
		// 		onPress={() => {
		// 			// The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
		// 			signOut();
		// 		}}>
		// 		Sign Out
		// 	</Text>
		// </View>
		<Redirect href="/(app)/(tabs)/feed" />
	);
}