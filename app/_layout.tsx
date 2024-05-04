import { Slot } from 'expo-router';
import { SessionProvider } from '@/contexts/authContext';

export default function RootLayout() {

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	return (
		<SessionProvider>
			<Slot/>
		</SessionProvider>
	);
}
