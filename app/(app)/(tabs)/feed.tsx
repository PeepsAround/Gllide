import { Text, View } from "react-native"
import { useEffect, useState } from 'react'

import { useLocation } from "@/contexts/locationContext";

export default function Feed() {
	const { location, refreshLocation } = useLocation();
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [posts, setPosts] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			console.log(`From Longitue : ${location?.coords.longitude} and Latitued : ${location?.coords.latitude}`);
			await refreshLocation();
			console.log(`From Longitue : ${location?.coords.longitude} and Latitued : ${location?.coords.latitude}`);
		})();
	}, [errorMsg]);


	return (
		<View>
			<Text>
				Welcome to Feed
			</Text>
			<Text>
				From Longitue : {location?.coords.longitude} and Latitued : {location?.coords.latitude}
			</Text>
			<Text>
				{posts}
			</Text>
		</View>
	)
}