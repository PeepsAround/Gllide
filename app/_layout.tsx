import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LocationProvider } from '@/contexts/locationContext';
import { SessionProvider } from '@/contexts/authContext';
import { Slot } from 'expo-router';

export default function RootLayout() {

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BottomSheetModalProvider>
				<SessionProvider>
					<LocationProvider>
						<Slot/>
					</LocationProvider>
				</SessionProvider>
			</BottomSheetModalProvider>
    	</GestureHandlerRootView>
	);
}
