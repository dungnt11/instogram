import React from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  Dimensions, StyleSheet,
} from "react-native";
import Constants from 'expo-constants';
import { axios } from '../config/axios';
import { Loader } from "../components/Loader";
import { store } from '../store/user';

const { width, height } = Dimensions.get("window");

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Instagram",
    headerTitleStyle: {
      textAlign: "center",
      flex: 1,
      fontFamily: "lobster_regular",
      fontSize: 22
    },
    headerRight: <View />,
    headerLeft: <View />
  });

  state = {
    loaded: true,
    data: null,
    profileImg: null
  };

  componentDidMount() {
    const userID = store.user.currentID || store.userInfo._id;
    this.fetchFeed(userID);
  }

  componentWillUnmount() {
    store.user.currentID = '';
  }

  async fetchFeed(userID) {
    const posts = await axios.get(`/api/users/self/${userID}`);
    const img = posts.data.profile_picture;
    await this.setState({
      loaded: false,
      data: posts.data.data,
      profileImg: img
    });
    this.renderHeader();
  }

  renderHeader = () => {
    const user = store.userInfo;
    return (
      <View style={{ padding: 20, flexDirection: "row", marginTop: Constants.statusBarHeight }}>
        <Image
          source={{ uri: user.avatar }}
          style={styles.profileImage}
        />
        <View>
          <Text>{user.displayName}</Text>
          <View
            style={{
              flex: 1,
              padding: 5,
              width: width * 0.7,
              justifyContent: 'space-between',
              flexDirection: 'row'
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
          <View
              style={{
                borderWidth: 1,
                width: "100%",
                marginLeft: 1,
                alignItems: "center"
              }}
            >
              <Text>Edit Profile</Text>
            </View>
        </View>
      </View>
    );
  };

  renderItem = (postInfo) => {
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

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loaded} text="Loading..." />
        {this.renderHeader()}
        <FlatList
          numColumns={3}
          data={this.state.data}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

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
    width: width * 0.33
  }
});
