import { Text, View } from "react-native"
import { useEffect, useState } from 'react'

import { FeedPostDTO } from "@/models/feedPostDTO";
import { HttpStatusCode } from "axios";
import PostList from "@/components/postList";
import { axiosInstance } from "@/helper/axiosHelper";
import { logError } from "@/helper/errorLogger";
import { useLocation } from "@/contexts/locationContext";

export default function Feed() {
	const { location } = useLocation();
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [posts, setPosts] = useState<FeedPostDTO[] | null>(null);

	const getFeed = async () => {
		try{
			var response = await axiosInstance.get(`/feed?longitude=${location?.coords.longitude}&latitude=${location?.coords.latitude}&radius=3`);
			if(response.status == HttpStatusCode.Ok){
				const posts:FeedPostDTO[] = response.data;
				console.log(posts);
				setPosts(posts);
			}else{
				alert("Failed!");
			}
		}
		catch (error){
			logError(error);
		}
	}

	useEffect(() => {
		(async () => {
			getFeed();
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
			<PostList posts={posts}></PostList>
		</View>
	)
}