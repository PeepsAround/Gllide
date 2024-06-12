import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import { Button, StyleSheet, Text, View } from "react-native";

import { useState } from "react";

interface CommentSectionProps {
	currPostId: string,
	postComment: Function
}

const CommentSection: React.FC<CommentSectionProps> = ({currPostId, postComment}: CommentSectionProps) => {
	const [commentText, setCommentText] = useState<string>();
	
	return (
		<BottomSheetView style={styles.view}>
			<View style={styles.flexContainer}>
				<Text>{currPostId}</Text>
			</View>
			<View style={styles.inputContainer}>
				<BottomSheetTextInput value={commentText} onChangeText={commentText => setCommentText(commentText)} style={styles.input} />
				<Button title='post' onPress={() => {postComment(currPostId, commentText); setCommentText("")}}/>
			</View>
		</BottomSheetView>
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