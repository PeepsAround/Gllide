import BottomSheet, { BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { Button, Platform, StyleSheet, Text, View } from "react-native"
import { useCallback, useMemo, useRef } from "react";

import { TextInput } from 'react-native-gesture-handler';

export default function Around() {
	// variables
	const snapPoints = useMemo(() => ["85%"], []);

	// renders
	return (
		<BottomSheet
			index={0}
			snapPoints={snapPoints}
			android_keyboardInputMode="adjustResize"
			keyboardBlurBehavior="restore"
			{...(Platform.OS === 'ios' && { keyboardBehavior: 'extend' })}
		>
			<BottomSheetView style={styles.view}>
				<View style={styles.flexContainer} />
				<View style={styles.inputContainer}>
					<BottomSheetTextInput style={styles.input} />
				</View>
			</BottomSheetView>
		</BottomSheet>
	);
};

const styles = StyleSheet.create({
	view: {
		borderWidth: 1,
		flex: 1,
	},
	flexContainer: {
		flex: 1,
	},
	inputContainer: {
		marginHorizontal: 16,
		marginBottom: 10,
	},
	input: {
		borderRadius: 10,
		fontSize: 16,
		lineHeight: 20,
		padding: 8,
		backgroundColor: 'rgba(151, 151, 151, 0.25)',
		color: '#fff',
	}
});