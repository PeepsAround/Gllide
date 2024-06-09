import * as SplashScreen from 'expo-splash-screen';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Redirect, Slot, Stack, Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { useLocation } from '@/contexts/locationContext';
import { useSession } from '@/contexts/authContext'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
	const { session, isLoading } = useSession();
	const { location, refreshLocation } = useLocation();

	const [fontLoaded, error] = useFonts({
		SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		refreshLocation();
	}, []);

	useEffect(() => {
		if (fontLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontLoaded]);

	// You can keep the splash screen open, or render a loading screen like we do here.
	if (!fontLoaded || isLoading || location == undefined) {
		return <View style={styles.loadingContainer}>
			<Text>Loading...</Text>
		</View>;
	}

	// Only require authentication within the (app) group's layout as users
	// need to be able to access the (auth) group and sign in again.
	if (!session) {
		// On web, static rendering will stop here as the user is not authenticated
		// in the headless Node process that the pages are rendered in.
		return <Redirect href="/sign-in" />;
	}

	// This layout can be deferred because it's not the root layout.
	return (
		<>
			<Stack screenOptions={{ headerShown: false }}/>

		</>
	)
}


const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		justifyContent: 'center'
	}
});
