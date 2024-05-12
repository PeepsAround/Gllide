import * as Location from 'expo-location';

import { createContext, useContext, useEffect, useState } from 'react';

const LocationContext = createContext<{
	refreshLocation: () => void,
	location: Location.LocationObject
}>({
	refreshLocation: () => null,
	location: null
});

export function useLocation() {
	const value = useContext(LocationContext);
	if (process.env.NODE_ENV !== 'production') {
		if (!value) {
			throw new Error('useSession must be wrapped in a <SessionProvider />');
		}
	}

	return value;
}

const refreshLocation = async () => {
	try {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			alert('Permission to access location was denied');
			return;
		}

		let location = await Location.getCurrentPositionAsync({});

		return location;
	} catch (error) {
		console.log("Error :", error);
		alert(`Error : ${error}`);
	}
	return null;
}

export function LocationProvider(props: React.PropsWithChildren){
	const [location, setLocation] = useState<Location.LocationObject>();

	useEffect(() => {
		(async () => {
			setLocation(await refreshLocation());
		})();
	}, []);

	return (
		<LocationContext.Provider
			value={{
				refreshLocation: async () => {
					let location = await refreshLocation();
					setLocation(location);
				},
				location
			}}>
			{props.children}
		</LocationContext.Provider>
	);
}