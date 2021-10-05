import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Loader } from "../../../components/Loader";
import { axios } from "../../../config/axios";
import { store } from "../../../store/user";

const { width, height } = Dimensions.get("window");

const ProfileTab = (props) => {
  const navigationOptions = ({ navigation }) => ({
    title: "Instagram",
    headerTitleStyle: {
      textAlign: "center",
      flex: 1,
      fontFamily: "lobster_regular",
      fontSize: 22,
    },
    headerRight: <View />,
    headerLeft: <View />,
  });

  const [loaded, setLoaded] = useState(true);
  const [data, setData] = useState(null);
  const [profileImg, setProfileImg] = useState(null);

  useEffect(() => {
    const userID = store.user.currentID || store.userInfo._id;
    fetchFeed(userID);
    return () => {
      store.user.currentID = "";
    };
  }, []);

  const fetchFeed = async (userID) => {
    const posts = await axios.get(`/api/users/self/${userID}`);
    const img = posts.data.profile_picture;
    setLoaded(false);
    setData(posts.data.data);
    setProfileImg(img);
    renderHeader();
  };

  async function logOut() {
    await AsyncStorage.removeItem('@user');
    props.navigation.navigate("AuthStack");
  }

  const renderHeader = () => {
    const user = store.userInfo;
    return (
      <View>
        <TouchableOpacity onPress={logOut}>
          <Text style={{marginTop: Constants.statusBarHeight, textAlign: 'center', fontSize: 20, fontWeight: '900'}}>{user.displayName}</Text>
        </TouchableOpacity>
        <View
          style={{
            padding: 20,
            flexDirection: "row",
          }}
        >
          <Image source={{ uri: user.avatar }} style={styles.profileImage} />
          <View
            style={{
              flex: 1,
              padding: 5,
              width: width * 0.7,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>40</Text>
              <Text>Posts</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>339</Text>
              <Text>followers</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>393</Text>
              <Text>following</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderItem = (postInfo) => {
    const imageUri = postInfo.image;

    return (
      <View style={styles.gridImgContainer}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{ uri: imageUri }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Loader loading={loaded} text="Loading..." />
      {renderHeader()}
      <FlatList
        numColumns={3}
        data={data}
        renderItem={({ item, index }) => renderItem(item, index)}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gridImgContainer: {
    padding: 1,
    backgroundColor: "#CCC",
  },
  profileImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.5,
    borderWidth: 1,
    marginRight: 10,
  },
  image: {
    height: width * 0.33,
    width: width * 0.33,
  },
});

export default ProfileTab;
