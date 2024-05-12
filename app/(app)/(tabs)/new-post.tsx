import * as ImagePicker from 'expo-image-picker';

import { Button, Image, View } from "react-native"
import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { useLocation } from '@/contexts/locationContext';

export default function NewPost() {
	const [text, onChangeText] = React.useState<string>();
	const { location } = useLocation();
	const [image, setImage] = useState(null);
	
	const clickImage = async() => {
		let { status } = await ImagePicker.requestCameraPermissionsAsync();

		if(status !== 'granted'){
			alert('Permission to access camera was denied');
			return;
		}

		let result = await ImagePicker.launchCameraAsync({});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	}

	const pickImage = async () => {



		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
			cameraType: ImagePicker.CameraType.back,
		});
	  
		  console.log(result);
	  
		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	  
	}

	const clearPickedImage = () => {
		setImage(null);
	}

	return (
		<View>
			<View style={styles.view}>
				<TextInput
					style={styles.input}
					editable
					multiline
					numberOfLines={4}
					maxLength={1000}
					onChangeText={text => onChangeText(text)}
					value={text}
					textAlignVertical={"top"}
					placeholder={`What's up ? From Longitue : ${location?.coords.longitude} and Latitued : ${location?.coords.latitude}`}
				/>
			{image && <Image source={{ uri: image }} style={styles.image}/>}
			</View>
			<View style={styles.buttonsView}>
				{!image && <Button title="Gallery" onPress={pickImage} />}
				{!image && <Button title="Camera" onPress={clickImage} />}
				{image && <Button title="Clear" onPress={clearPickedImage} />}
				<Button title="Post" onPress={pickImage} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	view: {
		padding: 5,
		borderWidth: 1,
		margin: 5,
		borderRadius: 5
	},
	input: {
	},
	buttonsView: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginRight: 5,
		gap: 5
	},
	image: {
		width: 200,
		height: 200
	},	
});