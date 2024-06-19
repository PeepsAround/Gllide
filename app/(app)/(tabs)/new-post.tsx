import * as ImagePicker from 'expo-image-picker';

import { Button, Image, View } from "react-native"
import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import {CheckBox} from 'rn-inkpad';
import { HttpStatusCode } from 'axios';
import { axiosPost } from '@/helper/axiosHelper';
import { logError } from '@/helper/errorLogger';
import { useLocation } from '@/contexts/locationContext';

export default function NewPost() {
	const [text, setText] = useState<string>();
	const [radius, setRadius] = useState<string>();
	const { location } = useLocation();
	const [image, setImage] = useState(null);
	const [postAnonymously, setPostAnonymously] = useState(false);

	const clickImage = async () => {
		try {
			let { status } = await ImagePicker.requestCameraPermissionsAsync();

			if (status !== 'granted') {
				alert('Permission to access camera was denied');
				return;
			}
	
			let result = await ImagePicker.launchCameraAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [1, 1],
				quality: 0.2,
				cameraType: ImagePicker.CameraType.back,
			});
	
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
				quality: 0.2,
				cameraType: ImagePicker.CameraType.back,
			});
	
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
			formData.append('radius', radius.toString());
			//@ts-ignore
			formData.append('postAnonymously', postAnonymously ? true : false);

			const response = await axiosPost("/post/add", formData, { "headers": {"Content-Type": "multipart/form-data" }});

			if(response?.status === HttpStatusCode.Ok){
				setImage(null);
				setText("");
				setRadius("");
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
			<View style={styles.buttonParentView}>
				<TextInput
					editable
					onChangeText={radius => setRadius(radius)}
					value={radius}
					placeholder="Radius"
					style={styles.radiusField}
				/>
				<View style={styles.buttonsView}>
					<CheckBox
						checked={false}
						iconColor={'#000'}
						iconSize={25}
						textStyle={{fontSize: 20}}
						onChange={() => setPostAnonymously(!postAnonymously)}
						title={'Anonymous'}
					/>
					{!image && <Button title="Gallery" onPress={pickImage} />}
					{!image && <Button title="Camera" onPress={clickImage} />}
					{image && <Button title="Clear" onPress={clearPickedImage} />}
					<Button title="Post" onPress={post} />
				</View>
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
	buttonParentView: {
		flexDirection: "column",
	},
	radiusField: {
		padding: 5,
		margin: 5,
		borderWidth: 1,
		borderRadius: 5
	},
	CheckBox: {
		padding: 0,
		margin: 0,
		height: 'auto'
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