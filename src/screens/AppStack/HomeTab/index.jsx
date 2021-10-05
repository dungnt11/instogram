import {
  FontAwesome,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Video } from "expo-av";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Loader } from "../../../components/Loader";
import { axios } from "../../../config/axios";
import { store } from "../../../store/user";

const { width, height } = Dimensions.get("window");

const HomeTab = (props) => {
  const navigationOptions = ({ navigation }) => ({
    title: "Instagram",
    headerTitleStyle: styles.headerText,
    headerRight: (
      <TouchableOpacity
        style={{
          paddingHorizontal: 10,
        }}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome name="paper-plane" size={24} color="black" />
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity
        style={{
          paddingHorizontal: 10,
        }}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome name="camera" size={24} color="black" />
      </TouchableOpacity>
    ),
  });

  const [loaded, setLoaded] = useState(true);
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [idPostComment, setIdPostComment] = useState("");
  const [currentComment, setCurrentComment] = useState("");
  const [loadingComment, setLoadingComment] = useState(false);

  useEffect(() => {
    fetchFeed(store._id);
  }, []);

  const reActionPost = async (idPost) => {
    const userID = store.userInfo._id;
    await axios.get(`/api/reaction/${idPost}/${userID}`);
    const dataClone = JSON.parse(JSON.stringify(data));
    const indCurrentPost = dataClone.findIndex((item) => item.id === idPost);
    if (indCurrentPost > -1) {
      const likeds = dataClone[indCurrentPost].likes;
      if (likeds.includes(userID)) {
        dataClone[indCurrentPost].likes = dataClone[
          indCurrentPost
        ].likes.filter((item) => item !== userID);
      } else {
        dataClone[indCurrentPost].likes.push(userID);
      }
      setData(dataClone);
    }
  };

  const commentPost = async (idPost, indPost) => {
    try {
      setLoadingComment(true);
      const userID = store.userInfo._id;
      const commentListUpdate = await axios.post(
        `/api/comment/${idPost}/${userID}`,
        {
          comment: currentComment,
        }
      );
      setCurrentComment("");
      const commentList = await updateComment(commentListUpdate.data);
      const commentsCloned = [...comments];
      commentsCloned[indPost] = commentList;
      setComments(commentsCloned);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingComment(false);
    }
  };

  const viewProfile = (userAuthor) => {
    store.user.currentID = userAuthor;
    props.navigation.navigate("ProfileTab");
  };

  const createPost = (postInfo, index) => {
    const userID = store.userInfo._id;

    const imageUri = postInfo.url;
    const status = postInfo.status;
    const username = postInfo.username.toString();
    const avatar = postInfo.avatar;
    const numlikes = postInfo.likes;

    return (
      <KeyboardAwareScrollView
        style={{
          marginTop: 20,
          marginBottom: 5,
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 10,
          paddingBottom: 30
        }}
      >
        <View style={styles.infoContainer}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <TouchableOpacity onPress={() => viewProfile(postInfo.userID)}>
              <Image style={styles.profileImage} source={{ uri: avatar }} />
            </TouchableOpacity>
            <Text style={styles.infoText}>{username}</Text>
          </View>
          <MaterialCommunityIcons name="dots-vertical" size={26} color="gray" />
        </View>
        <Text style={{ marginLeft: 5, marginBottom: 10 }}>{status}</Text>
        {postInfo.type === "image" ? (
          <Image style={styles.image} source={{ uri: imageUri }} />
        ) : (
          <Video
            source={{
              uri: "https://dung.awe7.com/api/video/6874CAE5-3CAE-41FE-98FC-5914DA1C8EB6.mov",
            }}
            style={{ width, height: 250 }}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 12,
          }}
        >
          <TouchableOpacity onPress={() => reActionPost(postInfo.id)}>
            {postInfo.likes.includes(userID) ? (
              <FontAwesome name="heart" size={32} color="red" />
            ) : (
              <FontAwesome name="heart-o" size={32} color="black" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingHorizontal: 15 }}
            onPress={() => setIdPostComment(postInfo.id)}
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
        {idPostComment === postInfo.id ? (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              width,
              marginBottom: 10,
              marginTop: 10,
              marginLeft: 10,
            }}
          >
            <Image style={styles.profileImage} source={{ uri: avatar }} />
            <TextInput
              style={{
                height: 40,
                width: 0.7 * width,
                paddingLeft: 10,
                marginLeft: 5,
                alignSelf: "center",
              }}
              placeholder="Content comment..."
              onChangeText={(text) => setCurrentComment(text)}
              value={currentComment}
            />
            <TouchableOpacity
              style={{
                width: width * 0.1,
                alignSelf: "center",
                marginLeft: 10,
              }}
              onPress={() => commentPost(postInfo.id, index)}
            >
              {loadingComment ? (
                <ActivityIndicator />
              ) : (
                <Text style={{ color: "#00a6ff" }}>Post</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}
        <View style={{ paddingLeft: 10 }}>{comments[index]}</View>
      </KeyboardAwareScrollView>
    );
  };

  const updateComment = (commentsList) => {
    return commentsList.map((commentInfo) => (
      <View style={styles.comment} key={commentInfo.text}>
        <Text style={styles.commentText}>{commentInfo.from.displayName}</Text>
        <Text>{commentInfo.text}</Text>
      </View>
    ));
  };

  const makeCommentsList = async (posts) => {
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
        const comments = await axios.get(`/api/comments/${postId}`);
        const commentsArray = comments.data;

        const commentsList = commentsArray.map((commentInfo) => (
          <View style={styles.comment} key={commentInfo.text}>
            <Text style={styles.commentText}>
              {commentInfo.from.displayName}
            </Text>
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

  const fetchFeed = async (userID) => {
    const posts = await axios.get(`/api/feeds/${userID}`);

    const comments = await makeCommentsList(posts.data);

    setLoaded(false);
    setData(posts.data);
    setComments(comments);
  };

  return (
    <View style={styles.container}>
      <Loader loading={loaded} text="Loading..." />
      <View style={styles.headerPanel}>
        <Text style={styles.headerLogo}>Instagram</Text>
      </View>
      <TouchableOpacity onPress={() => {
        AsyncStorage.removeItem('@user');
      }}>
        <Text>Clean</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.listFeeds}
        data={data}
        renderItem={({ item, index }) => createPost(item, index)}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  headerPanel: {
    marginTop: Constants.statusBarHeight,
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#222",
    justifyContent: "center",
  },
  headerLogo: {
    fontFamily: "lobster_regular",
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 20,
    color: "#fff",
  },
  listFeeds: {
    paddingHorizontal: 10,
    zIndex: 99,
  },
  headerText: {
    textAlign: "center",
    flex: 1,
    fontFamily: "lobster_regular",
    fontSize: 22,
    color: "#222",
  },
  inputWrapper: {
    marginTop: 20,
  },
  profileImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.4,
    borderWidth: 1,
  },
  image: {
    width,
    height: width * 0.8,
  },
  infoContainer: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 10,
    flex: 1,
    alignItems: "center",
  },
  infoText: {
    fontSize: 12,
    paddingLeft: 10,
    fontWeight: "bold",
  },
  comment: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  commentText: {
    marginRight: 2,
    fontWeight: "700",
  },
});

export default HomeTab;
