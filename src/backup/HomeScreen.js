import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {
  FontAwesome,
  MaterialCommunityIcons,
  SimpleLineIcons
} from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { store } from '../store/user';
import Constants from 'expo-constants';
import { Video } from 'expo-av';

import { axios } from '../config/axios';

import { Loader } from "../components/Loader";

const { width, height } = Dimensions.get("window");

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Instagram",
    headerTitleStyle: styles.headerText,
    headerRight: (
      <TouchableOpacity
        style={{
          paddingHorizontal: 10
        }}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome name="paper-plane" size={24} color="black" />
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity
        style={{
          paddingHorizontal: 10
        }}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome name="camera" size={24} color="black" />
      </TouchableOpacity>
    )
  });

  state = {
    loaded: true,
    data: null,
    comments: [],
    idPostComment: '',
    currentComment: '',
    loadingComment: false,
  };

  componentDidMount() {
    this.fetchFeed(store._id);
  }

  async reActionPost(idPost) {
    const userID = store.userInfo._id;
    await axios.get(`/api/reaction/${idPost}/${userID}`);
    const dataClone = JSON.parse(JSON.stringify(this.state.data));
    const indCurrentPost = dataClone.findIndex((item) => item.id === idPost);
    if (indCurrentPost > -1) {
      const likeds = dataClone[indCurrentPost].likes;
      if (likeds.includes(userID)) {
        dataClone[indCurrentPost].likes = dataClone[indCurrentPost].likes.filter((item) => item !== userID);
      } else {
        dataClone[indCurrentPost].likes.push(userID);
      }
      this.setState({ data: dataClone });
    }
  }

  async commentPost(idPost, indPost) {
    try {
      this.setState({ loadingComment: true });
      const userID = store.userInfo._id;
      const { currentComment } = this.state;
      const commentListUpdate = await axios.post(`/api/comment/${idPost}/${userID}`, {
        comment: currentComment,
      });
      this.setState({ currentComment: '' });
      const comments = await this.updateComment(commentListUpdate.data);
      const commnetsCloned = [...this.state.comments];
      commnetsCloned[indPost] = comments;
      this.setState({ comments: commnetsCloned });
    } catch (error) {
      console.log(error);   
    } finally {
      this.setState({ loadingComment: false });
    }
  }

  viewProfile(userAuthor) {
    store.user.currentID = userAuthor;
    this.props.navigation.navigate("ProfileScreen");
  }

  createPost = (postInfo, index) => {
    const userID = store.userInfo._id;
    const { currentComment, idPostComment, loadingComment } = this.state;

    const imageUri = postInfo.url;
    const status = postInfo.status;
    const username = postInfo.username.toString();
    const avatar = postInfo.avatar;
    const numlikes = postInfo.likes;

    return (
      <KeyboardAwareScrollView>
        <View style={styles.infoContainer}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <TouchableOpacity onPress={this.viewProfile.bind(this, postInfo.userID)}>
              <Image style={styles.profileImage} source={{ uri: avatar }} />
            </TouchableOpacity>
          <Text style={styles.infoText}>{username}</Text>
          </View>
          <MaterialCommunityIcons name="dots-vertical" size={26} color="gray" />
        </View>
        <Text style={{ marginLeft: 5, marginBottom: 10 }}>{status}</Text>
        { postInfo.type === 'image' ? (
          <Image style={styles.image} source={{ uri: imageUri }} />
        ) : (
          <Video
            source={{ uri: 'https://dung.awe7.com/api/video/6874CAE5-3CAE-41FE-98FC-5914DA1C8EB6.mov' }}
            style={{ width, height: 250 }}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        ) }
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 12
          }}
        >
          <TouchableOpacity
            onPress={this.reActionPost.bind(this, postInfo.id)}
          >
            { postInfo.likes.includes(userID) ? (
              <FontAwesome name="heart" size={32} color="pink" />
            ) : (
              <FontAwesome name="heart-o" size={32} color="black" />
            ) }
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingHorizontal: 15 }}
            onPress={() => this.setState({ idPostComment: postInfo.id })}
          >
            <SimpleLineIcons name="bubble" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <SimpleLineIcons name="paper-plane" size={28} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.infoText}>
          {numlikes.length + (numlikes.length !== 1 ? " likes" : " like")}
        </Text>
        { idPostComment === postInfo.id ? (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              width,
              marginBottom: 10,
              marginTop: 10,
              marginLeft: 10
            }}>
            <Image style={styles.profileImage} source={{ uri: avatar }} />
            <TextInput
              style={{
                height: 40,
                width: .7 * width,
                paddingLeft: 10,
                marginLeft: 5,
                alignSelf: 'center'
              }}
              placeholder="Content comment..."
              onChangeText={(text) => this.setState({ currentComment: text })}
              value={currentComment}
            />
            <TouchableOpacity
              style={{
                width: width * .1,
                alignSelf: 'center',
                marginLeft: 10
              }}
              onPress={this.commentPost.bind(this, postInfo.id, index)}
            >
              { loadingComment ? (
                <ActivityIndicator />
              ) : (
                <Text style={{ color: '#00a6ff' }}>Post</Text>
              ) }
            </TouchableOpacity>
          </View>
        ) : <View></View> }
        <View style={{ paddingLeft: 10 }}>{this.state.comments[index]}</View>
      </KeyboardAwareScrollView>
    );
  };

  updateComment = (commentsList) => {
    return commentsList.map((commentInfo) => (
      <View style={styles.comment} key={commentInfo.text}>
        <Text style={styles.commentText}>{commentInfo.from.displayName}</Text>
        <Text>{commentInfo.text}</Text>
      </View>
    ));
  }

  makeCommentsList = async (posts) => {
    let postsArray = posts.map(async (post) => {
      const postId = post.id;
      if (post.comments.count === 0) {
        return (
          <View style={styles.comment} key={postId}>
            <Text>No Comments!</Text>
          </View>
        );
      }
      try {
        /**
          {
            from: {
              displayName,
              avatar,
              id: userDB._id,
            },
            text: comment,
          }
         */

        const comments = await axios.get(`/api/comments/${postId}`);
        const commentsArray = comments.data;
  
        const commentsList = commentsArray.map((commentInfo) => (
          <View style={styles.comment} key={commentInfo.text}>
            <Text style={styles.commentText}>{commentInfo.from.displayName}</Text>
            <Text>{commentInfo.text}</Text>
          </View>
        ));
        return commentsList;
      } catch (error) {
        console.log(error);
      }
    });
    postsArray = await Promise.all(postsArray);
    return postsArray;
  };

  async fetchFeed(userID) {
    const posts = await axios.get(`/api/feeds/${userID}`);

    const comments = await this.makeCommentsList(posts.data);

    this.setState({
      loaded: false,
      data: posts.data,
      comments
    });
  }

  render() {
    console.log(this.state.data);
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loaded} text="Loading..." />
        <FlatList
          style={styles.listFeeds}
          data={this.state.data}
          renderItem={({ item, index }) => this.createPost(item, index)}
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
    justifyContent: "center",
  },
  listFeeds: {
    marginTop: Constants.statusBarHeight,
  },
  headerText: {
    textAlign: "center",
    flex: 1,
    fontFamily: "lobster_regular",
    fontSize: 22
  },
  inputWrapper: {
    marginTop: 20
  },
  profileImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.4,
    borderWidth: 1
  },
  image: {
    width,
    height: width * 0.8
  },
  infoContainer: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 10,
    flex: 1,
    alignItems: "center"
  },
  infoText: {
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: "bold"
  },
  comment: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentText: {
    marginRight: 2,
  }
});

export default HomeScreen;
