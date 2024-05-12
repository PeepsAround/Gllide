import { LocationProvider } from '@/contexts/locationContext';
import { SessionProvider } from '@/contexts/authContext';
import { Slot } from 'expo-router';

export default function RootLayout() {

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	return (
		<SessionProvider>
			<LocationProvider>
				<Slot/>
			</LocationProvider>
		</SessionProvider>
	);
}
