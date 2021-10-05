import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
  View,
  Platform,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { axios } from '../../../../config/axios';
import { store } from '../../../../store/user';

const { width } = Dimensions.get("window");

export default function ImagePickerExample(props) {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  async function postFn() {
    setLoading(true);
    const data = new FormData();
    data.append('_id', store.userInfo._id);
    data.append('width', image.width);
    data.append('height', image.height);
    data.append('type', image.type);
    data.append('status', status);
    const fileName = image.uri.slice(image.uri.lastIndexOf('/') + 1);

    data.append('file', {
      uri: image.uri,
      type: 'image/jpeg',
      name: fileName,
      path: image.uri.slice(image.uri.lastIndexOf('.') + 1)
    });
  
    try {
      const res = await axios.post(
        '/api/create-post',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }
      );
      store.addNewPost(res.data);
      props.navigation.navigate("HomeScreen");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <View style={style.posts}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <KeyboardAwareScrollView>
          { image.type === 'image' ? (
            <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />
          ) : (
            <Video
              source={{ uri: image.uri }}
              style={{ width, height: 250 }}
              useNativeControls
              resizeMode="contain"
              isLooping
            />
          ) }
          <TextInput
            style={style.description}
            placeholder="Write a caption"
            onChangeText={(newStatus) => setStatus(newStatus)}
            value={status}
          />
          { loading ? <ActivityIndicator /> : (
            <Button
              title="Post"
              color="#3b86ff"
              onPress={postFn}
            />
          ) }
        </KeyboardAwareScrollView>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  posts: {
    height: 450,
    flex: 1
  },
  description: {
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginRight: 10,
    minHeight: 50
  }
});
