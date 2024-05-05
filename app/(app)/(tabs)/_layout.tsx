import { Tabs } from 'expo-router';

export default function TabsLayout() {
	return (
		<Tabs>
			<Tabs.Screen name="feed" options={{
				title: "Feed",
				headerTitle: "Feed"
			}}/>
			<Tabs.Screen name="around" options={{
				title: "Around",
				headerTitle: "Around"
			}}/>
			<Tabs.Screen name="new-post" options={{
				title: "New Post",
				headerTitle: "New Post"
			}}/>
			<Tabs.Screen name="notifications" options={{
				title: "Notifications",
				headerTitle: "Notifications"
			}}/>
			<Tabs.Screen name="profile" options={{
				title: "Profile",
				headerTitle: "Profile"
			}}/>
		</Tabs>
	)
}