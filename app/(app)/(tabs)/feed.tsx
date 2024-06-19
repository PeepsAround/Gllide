import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { Text, View } from "react-native"
import { useEffect, useRef, useState } from 'react'

import { CommentDTO } from "@/models/commentDTO";
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
	const [pageNo, setPageNo] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [posts, setPosts] = useState<FeedPostDTO[] | null>(null);
	
	// States for comment section
	const [currPostId, setCurrPostId] = useState<string | null>(null);
	const [currPostComments, setCurrPostComments] = useState<CommentDTO[] | null>([]);

	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const { dismiss } = useBottomSheetModal();

	const handlePresentModalPress = () => bottomSheetRef.current?.present();

	const openCommentSection = async (postId: string) => {
		try{
			setCurrPostComments([]);
			setCurrPostId(postId);
			handlePresentModalPress();

			var response = await axiosInstance.get(`/comment?postId=${postId}`);
			if(response.status == HttpStatusCode.Ok){
				const comments: CommentDTO[] = response.data;
				setCurrPostComments(comments);
			}else{
				alert("Failed!");
			}
		}
		catch (error){
			logError(error);
		}
	}
	
	const getFeed = async () => {
		try{
			var response = await axiosInstance.get(`/feed?longitude=${location?.coords.longitude}&latitude=${location?.coords.latitude}&radius=3&pageNo=${pageNo}&pageSize=${pageSize}`);
			if(response.status == HttpStatusCode.Ok){
				const posts: FeedPostDTO[] = response.data;
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

	const postComment = async(postId: string, commentText: string) => {
		try {

			const response = await axiosInstance.post("/comment", { postId, commentText });
			
			if (response.status === HttpStatusCode.Created) { // Or HttpStatusCode.Ok if it's defined
				// Add other comment details
				var comment:CommentDTO = response.data;
				setCurrPostComments([...currPostComments, comment]);
			} else {
				alert("Failed to post the comment!");
			}
		} catch (error) {
			logError(error);
			alert("An error occurred while trying to post the comment.");
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
		currPostId: currPostId,
		postComment: postComment,
		currPostComments: currPostComments
	}

	return (
		<View>
			<Text>
				From Longitue : {location?.coords.longitude} and Latitued : {location?.coords.latitude}
			</Text>
			<PostList {...postListPros}></PostList>
			<CustomBottomSheetModal ref={bottomSheetRef}>
				<CommentSection {...commentSectionProps} ></CommentSection>
			</CustomBottomSheetModal>
		</View>
	)
}