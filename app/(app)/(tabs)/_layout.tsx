import { Tabs } from 'expo-router';

export default function TabsLayout() {
	return (
		<Tabs>
			<Tabs.Screen name="feed" />
			<Tabs.Screen name="around" />
			<Tabs.Screen name="new-post" />
			<Tabs.Screen name="notifications" />
			<Tabs.Screen name="profile" />
		</Tabs>
	)
}