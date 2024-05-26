import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { FeedPostDTO } from '@/models/feedPostDTO';
import { FontAwesome } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useState } from 'react';

interface PostListProps {
	post: FeedPostDTO;
	userId: string;
	deleteMyPost: Function;
	likePost: Function;
}

const Post: React.FC<PostListProps> = ({ post, userId, deleteMyPost, likePost }) => {
	const [liked, setLiked] = useState(post.liked);
	const [likes, setLikes] = useState(post.likes);
	
	return (
		<View style={styles.post}>
			<View style={styles.postDetails}>
				<Text style={styles.userName}>{post.userName}</Text>
				<Text style={styles.text}>{post.text}</Text>
			</View>
			{post.imageUrl && <Image source={{ uri: post.imageUrl }} style={styles.image} />}
			<View style={styles.metaContainer}>
				<View style={styles.likeContainer}>
					{!liked && <TouchableOpacity onPress={() => { setLikes(likes+1);setLiked(true); likePost(post.postId, true) }}>
						<FontAwesome6 name="heart" size={24} color="black" />
					</TouchableOpacity>}
					{liked && <TouchableOpacity onPress={() => { setLikes(likes-1);setLiked(false); likePost(post.postId, false) }}>
						<FontAwesome name="heart" size={24} color="black" />
					</TouchableOpacity>}
					<Text style={styles.meta}>{likes}</Text>
				</View>
				<Text style={styles.meta}>💬 {post.comments}</Text>
				{userId === post.userId && (
					<TouchableOpacity onPress={() => { deleteMyPost(post.postId) }} style={styles.deleteButton}>
						<Text style={styles.deleteButtonText}>Delete</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		backgroundColor: '#fafafa',
	},
	post: {
		backgroundColor: '#fff',
		overflow: 'hidden',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#e0e0e0',
		paddingTop: 2,
		paddingBottom: 10
	},
	image: {
		width: '100%',
		height: 400,
	},
	postDetails: {
		padding: 10,
	},
	userName: {
		fontWeight: 'bold',
		fontSize: 16,
		color: '#262626',
	},
	text: {
		fontSize: 14,
		marginVertical: 5,
		color: '#262626',
	},
	metaContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 5,
	},
	meta: {
		fontSize: 24,
		color: '#8e8e8e',
	},
	deleteButton: {
		backgroundColor: 'red',
		padding: 5,
		borderRadius: 3,
	},
	deleteButtonText: {
		color: 'white',
		fontWeight: 'bold',
	},
	likeContainer: {
		flexDirection: 'row'
	}
});


export default Post;
