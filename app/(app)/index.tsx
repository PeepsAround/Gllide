import { Redirect } from 'expo-router';
import { setAxiosAuthHeader } from '@/helper/axiosHelper';
import { useSession } from '@/contexts/authContext'

export default function Index() {
	const { session } = useSession();

	// Set the token in axiosInstance, since it won't have it after app restart
	setAxiosAuthHeader(session);
	
	return (
		<Redirect href="/(app)/(tabs)/feed" />
	);
};