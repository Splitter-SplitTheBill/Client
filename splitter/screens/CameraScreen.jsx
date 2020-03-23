import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Text, View, TouchableOpacity, Image, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { TakePicture } from '../actions/cameraAction'

export default function CameraScreen ({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null)
  const dispatch = useDispatch()

  const takePicture = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync();
      dispatch(TakePicture(photo.uri))
      navigation.navigate('Create')
    }
  }

  const openGallery = async() => {
    let result = await ImagePicker.launchImageLibraryAsync()
    if(!result.cancelled) {
      dispatch(TakePicture(result.uri))
      navigation.navigate('Create')
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
        <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={type} ref={ref => {
          setCamera(ref)
        }}>
            <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'transparent',                  
          }}
          onPress={() => openGallery()}
          >
          <Ionicons
              name="ios-photos"
              style={{ color: "#fff", fontSize: 40}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}
          onPress={() => {
            takePicture()
          }}>
          <FontAwesome
              name="camera"
              style={{ color: "#fff", fontSize: 40}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}>
          <MaterialCommunityIcons
              name="camera-switch"
              style={{ color: "#fff", fontSize: 40}}
          />
        </TouchableOpacity>
      </View>
            </Camera>
          </View>
  )
}