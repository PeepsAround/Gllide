import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { FeedPostDTO } from '@/models/feedPostDTO';

interface PostListProps {
	posts: FeedPostDTO[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			{posts?.map(post => (
				<View key={post.postId} style={styles.post}>
					<View style={styles.postDetails}>
						<Text style={styles.userName}>{post.userName}</Text>
						<Text style={styles.text}>{post.text}</Text>
					</View>
					{post.imageUrl && <Image source={{ uri: post.imageUrl }} style={styles.image} />}
					<View style={styles.metaContainer}>
						<Text style={styles.meta}>❤️ {post.likes}</Text>
						<Text style={styles.meta}>💬 {post.comments}</Text>
					</View>
				</View>
			))}
		</ScrollView>
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
		fontSize: 12,
		color: '#8e8e8e',
	},
});


export default PostList;
