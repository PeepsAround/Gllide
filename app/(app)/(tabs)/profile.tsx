import { useSession } from "@/contexts/authContext";
import { Text, View } from "react-native"

export default function Profile(){
	const { signOut } = useSession();

	return (
		<View>
			<Text>
				Welcome to Profile!
			</Text>
					<Text
					onPress={() => {
						// The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
						signOut();
					}}>
					Sign Out
				</Text>
		</View>
	)
}