import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import { Button, StyleSheet, Text, View } from "react-native";

interface CommentSectionProps {
}


const CommentSection: React.FC<CommentSectionProps> = () => {
	return (
		<BottomSheetView style={styles.view}>
			<View style={styles.flexContainer} />
			<View style={styles.inputContainer}>
				<BottomSheetTextInput style={styles.input} />
				<Button title='pussy'/>
			</View>
		</BottomSheetView>
	)
}

const styles = StyleSheet.create({
	view: {
		borderWidth: 1,
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