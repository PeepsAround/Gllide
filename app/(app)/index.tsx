import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { Button, StyleSheet, View } from 'react-native';

import CustomBottomSheetModal from '@/components/CustomBottomSheetModal';
import { Redirect } from 'expo-router';
import { setAxiosAuthHeader } from '@/helper/axiosHelper';
import { useRef } from 'react';
import { useSession } from '@/contexts/authContext'

export default function Index() {
	const { signOut, session } = useSession();

	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const { dismiss } = useBottomSheetModal();

	const handlePresentModalPress = () => bottomSheetRef.current?.present();

	// Set the token in axiosInstance, since it won't have it after app restart
	setAxiosAuthHeader(session);
	
	return (
		<Redirect href="/(app)/(tabs)/feed" />
	);
}