import { Text, View } from 'react-native';
import { useSession } from '@/contexts/authContext'
import { Redirect } from 'expo-router';

export default function Index() {
	const { signOut } = useSession();
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