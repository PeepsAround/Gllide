import * as ImagePicker from 'expo-image-picker';

import { Button, Image, View } from "react-native"
import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { HttpStatusCode } from 'axios';
import { axiosPost } from '@/helper/axiosHelper';
import { logError } from '@/helper/errorLogger';
import { useLocation } from '@/contexts/locationContext';

export default function NewPost() {
	const [text, setText] = React.useState<string>();
	const { location } = useLocation();
	const [image, setImage] = useState(null);

	const clickImage = async () => {
		try {
			let { status } = await ImagePicker.requestCameraPermissionsAsync();

			if (status !== 'granted') {
				alert('Permission to access camera was denied');
				return;
			}
	
			let result = await ImagePicker.launchCameraAsync({});
	
			console.log(result);
	
			if (!result.canceled) {
				setImage(result.assets[0]);
			}
		} catch (e) {
			logError(e);
		}
	}

	const pickImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [1, 1],
				quality: 1,
				cameraType: ImagePicker.CameraType.back,
			});
	
			console.log(result);
	
			if (!result.canceled) {
				setImage(result.assets[0]);
			}
		} catch (e) {
			logError(e);
		}
	}

	const clearPickedImage = () => {
		setImage(null);
	}

	const post = async () => {
		try {

			let formData = new FormData();
			
			if(image){
				let localUri = image.uri;
				let filename = localUri.split('/').pop();
			  
				// Infer the type of the image
				let match = /\.(\w+)$/.exec(filename);
				let type = match ? `image/${match[1]}` : `image`;
			  
				// @ts-ignore 
				formData.append('image', { uri: localUri, name: filename, type });
			}

			formData.append('text', text);
			formData.append('longitude', location?.coords.longitude.toString());
			formData.append('latitude', location?.coords.latitude.toString());

			const response = await axiosPost("/post/add", formData, { "headers": {"Content-Type": "multipart/form-data" }});

			if(response.status === HttpStatusCode.Ok){
				setImage(null);
				setText("");
				alert("Success");
			}else{
				alert("Failed");
			}

		} catch (error) {
			logError(error);
		}
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
					onChangeText={text => setText(text)}
					value={text}
					textAlignVertical={"top"}
					placeholder={`What's up ? From Longitue : ${location?.coords.longitude} and Latitued : ${location?.coords.latitude}`}
				/>
				{image && <Image source={{ uri: image.uri }} style={styles.image} />}
			</View>
			<View style={styles.buttonsView}>
				{!image && <Button title="Gallery" onPress={pickImage} />}
				{!image && <Button title="Camera" onPress={clickImage} />}
				{image && <Button title="Clear" onPress={clearPickedImage} />}
				<Button title="Post" onPress={post} />
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