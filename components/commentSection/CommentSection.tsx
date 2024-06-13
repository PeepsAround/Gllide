import { BottomSheetFlatList, BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import { Button, StyleSheet, View } from "react-native";

import Comment from "./Comment";
import { CommentDTO } from "../../models/commentDTO";
import { useState } from "react";

interface CommentSectionProps {
	currPostId: string,
	postComment: Function,
	currPostComments: CommentDTO[]
}

const CommentSection: React.FC<CommentSectionProps> = ({currPostId, postComment, currPostComments}: CommentSectionProps) => {
	const [commentText, setCommentText] = useState<string>();
	
	return (
		<>
			<BottomSheetFlatList style={styles.flexContainer} 
				data={currPostComments}
				renderItem={({item}) =>	
					<Comment
					key={item.commentId}
					userName={item.userName}
					commentText={item.commentText}
					createdAt={item.createdAt}
					/>
				}
				keyExtractor={item => item.commentId}
			/>
			<View style={styles.inputContainer}>
				<BottomSheetTextInput value={commentText} onChangeText={commentText => setCommentText(commentText)} style={styles.input} />
				<Button title='post' onPress={() => {postComment(currPostId, commentText); setCommentText("")}}/>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	view: {
		flex: 1,
	},
	flexContainer: {
		flex: 1,
	},
	inputContainer: {
		marginHorizontal: 2,
		marginBottom: 40,
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 10
	},
	input: {
		flex: 1,
		borderRadius: 10,
		fontSize: 16,
		lineHeight: 20,
		padding: 8,
		backgroundColor: 'rgba(151, 151, 151, 0.25)',
	}
});

export default CommentSection;