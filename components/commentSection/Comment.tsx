import { StyleSheet, Text, View } from "react-native";

const Comment = ({ userName, commentText, createdAt }) => {
	return (
		<View style={styles.commentContainer}>
			<Text style={styles.userName}>{userName || 'Anonymous'}</Text>
			<Text style={styles.commentText}>{commentText}</Text>
			<Text style={styles.createdAt}>{createdAt ? createdAt.toLocaleString() : ''}</Text>
		</View>
	);
};

export default Comment;

const styles = StyleSheet.create({
	view: {
	  flex: 1,
	  padding: 16,
	},
	flexContainer: {
	  flex: 1,
	},
	inputContainer: {
	  flexDirection: 'row',
	  alignItems: 'center',
	},
	input: {
	  flex: 1,
	  borderColor: '#ccc',
	  borderWidth: 1,
	  padding: 8,
	  marginRight: 8,
	},
	commentContainer: {
	  padding: 8,
	  borderBottomWidth: 1,
	  borderBottomColor: '#ddd',
	},
	userName: {
	  fontWeight: 'bold',
	},
	commentText: {
	  marginVertical: 4,
	},
	createdAt: {
	  color: '#888',
	  fontSize: 12,
	},
  });
  