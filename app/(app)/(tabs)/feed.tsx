import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { Text, View } from "react-native"
import { useEffect, useRef, useState } from 'react'

import CommentSection from "@/components/commentSection/CommentSection";
import CustomBottomSheetModal from "@/components/CustomBottomSheetModal";
import { FeedPostDTO } from "@/models/feedPostDTO";
import { HttpStatusCode } from "axios";
import PostList from "@/components/PostList";
import { axiosInstance } from "@/helper/axiosHelper";
import { logError } from "@/helper/errorLogger";
import { useLocation } from "@/contexts/locationContext";
import { useSession } from "@/contexts/authContext";

export default function Feed() {
	const { location } = useLocation();
	const { userId } = useSession();
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [posts, setPosts] = useState<FeedPostDTO[] | null>(null);
	
	// States for comment section
	const [currPostComments, setCurrPostComments] = useState<string[] | null>(null);

	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const { dismiss } = useBottomSheetModal();

	const handlePresentModalPress = () => bottomSheetRef.current?.present();

	const openCommentSection = () => {
		handlePresentModalPress();
	}
	
	const getFeed = async () => {
		try{
			var response = await axiosInstance.get(`/feed?longitude=${location?.coords.longitude}&latitude=${location?.coords.latitude}&radius=3`);
			if(response.status == HttpStatusCode.Ok){
				const posts:FeedPostDTO[] = response.data;
				setPosts(posts);
			}else{
				alert("Failed!");
			}
		}
		catch (error){
			logError(error);
		}
	}

	const deleteMyPost = async (postId: string) => {
		try {
			const response = await axiosInstance.delete(`/post?postId=${postId}`);
			if (response.status === HttpStatusCode.Ok) { // Or HttpStatusCode.Ok if it's defined
				// Filter out the deleted post
				const updatedPosts = posts?.filter(post => post.postId !== postId);
				setPosts(updatedPosts);
			} else {
				alert("Failed to delete the post!");
			}
		} catch (error) {
			logError(error);
			alert("An error occurred while trying to delete the post.");
		}
	};

	const likePost = async (postId: string, action: boolean) => {
		try {
			const response = await axiosInstance.get(`/post/like?postId=${postId}&action=${action}`);
			if (response.status === HttpStatusCode.Ok) { // Or HttpStatusCode.Ok if it's defined

			} else {
				alert("Failed to delete the post!");
			}
		} catch (error) {
			logError(error);
			alert("An error occurred while trying to like the post!");
		}
	}

	useEffect(() => {
		(async () => {
			getFeed();
		})();
	}, [errorMsg]);

	const postListPros = {
		posts,
		userId,
		deleteMyPost,
		likePost,
		openCommentSection,
	}

	const commentSectionProps = {

	}

	return (
		<View>
			<Text>
				From Longitue : {location?.coords.longitude} and Latitued : {location?.coords.latitude}
			</Text>
			<PostList {...postListPros}></PostList>
			<CustomBottomSheetModal ref={bottomSheetRef}>
				<CommentSection></CommentSection>
			</CustomBottomSheetModal>
		</View>
	)
}