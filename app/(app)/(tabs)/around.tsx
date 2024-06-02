import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { StyleSheet, Text, View } from "react-native"

import { useMemo } from "react";

export default function Around(){
	const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);

	return (
		<View style={styles.container}>
			<BottomSheet index={1} snapPoints={snapPoints}>
				<View style={styles.contentContainer}>
					<Text>
						This is Awesome!
					</Text>
				</View>
			</BottomSheet>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  padding: 24,
	  backgroundColor: 'grey',
	},
	contentContainer: {
	  flex: 1,
	  alignItems: 'center',
	},
  });