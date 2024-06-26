import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { FeedPostDTO } from '@/models/feedPostDTO';
import Post from './Post';

interface PostListProps {
	posts: FeedPostDTO[];
	userId: string;
	deleteMyPost: Function;
	likePost: Function;
	openCommentSection: Function;
}

const PostList: React.FC<PostListProps> = ({ posts, userId, deleteMyPost, likePost, openCommentSection }) => {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			{posts?.map(post => (
				<Post key={post.postId} post={post} userId={userId} deleteMyPost={deleteMyPost} likePost={likePost} openCommentSection={openCommentSection}></Post>
			))}
		</ScrollView>

	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		backgroundColor: '#fafafa',
	}
});


export default PostList;
