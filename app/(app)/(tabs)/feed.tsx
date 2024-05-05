import { useSession } from "@/contexts/authContext";
import { Text, View } from "react-native"
import { useState, useEffect } from 'react'
import * as Location from 'expo-location';
import { axiosInstance } from "@/utils/helper";

export default function Feed() {
	const [location, setLocation] = useState<Location.LocationObject>();
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [posts, setPosts] = useState<string | null>(null);

	const getFeed = async() => {
		var response = await axiosInstance.post('/feed/getFeed');
		setPosts(response.data.post);
	}

	useEffect(() => {
		(async () => {

			try{
				let { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== 'granted') {
					setErrorMsg('Permission to access location was denied');
					return;
				}
	
				let location = await Location.getCurrentPositionAsync({});
				setLocation(location);
				await getFeed();
			}
			catch (error){
				console.log(error);
			}
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