import { BottomSheetBackdrop, BottomSheetModal, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Platform, StyleSheet, Text, View } from 'react-native';
import React, { ReactNode, forwardRef, useCallback, useMemo } from 'react';

interface CustomBottomSheetModalProps {
	children: ReactNode;
}

export type Ref = BottomSheetModal;

const CustomBottomSheetModal = forwardRef<Ref, CustomBottomSheetModalProps>((props, ref) => {
	const snapPoints = useMemo(() => ["85%"], []);

	const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
				appearsOnIndex={0}
			/>
		),
		[]
	);

	return (
		<BottomSheetModal 
		ref={ref} 
		index={0} 
		snapPoints={snapPoints} 
		backdropComponent={renderBackdrop} 
		android_keyboardInputMode="adjustResize" 
		keyboardBlurBehavior="restore"
		{...(Platform.OS === 'ios' && { keyboardBehavior: 'extend' })}
		>
			{props.children}
		</BottomSheetModal>
	);
});

export default CustomBottomSheetModal;