import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Constants from "expo-constants";
import { axios } from "../../../config/axios";
import { store } from "../../../store/user";
import { FlatList } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const ActivitiesTab = () => {
  // const [activityList, setActivityList] = useState([]);

  // const fetchActivities = async () => {
  //   try {
  //     const userId = store.user._id;
  //     const res = await axios.get(`/api/history/:${userId}`);
  //     setActivityList(res);
  //     console.log('Thong bao: ', res)
  //   } catch (e) {
  //     console.log('Lỗi api thông báo: ', e);
  //   }
  // }

  // useEffect(() => {
  //   fetchActivities();
  // },[])

  const activityList = [
    {
      id: "1",
      myID: {
        displayName: "Dũng Nguyễn",
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Aw08EMIINuHN2E_m6rmNBJSn9pdAUsNBKrjMc8SQKeeNjJ_rYdUUGq2QZP3R87Seg_c&usqp=CAU",
      },
      messenger: "Đã thích bài viết của bạn",
    },
    {
      id: "2",
      myID: {
        displayName: "Dũng Nguyễn",
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Aw08EMIINuHN2E_m6rmNBJSn9pdAUsNBKrjMc8SQKeeNjJ_rYdUUGq2QZP3R87Seg_c&usqp=CAU",
      },
      messenger: "Đã thích bài viết của bạn",
    },
    {
      id: "3",
      myID: {
        displayName: "Dũng Nguyễn",
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Aw08EMIINuHN2E_m6rmNBJSn9pdAUsNBKrjMc8SQKeeNjJ_rYdUUGq2QZP3R87Seg_c&usqp=CAU",
      },
      messenger: "Đã thích bài viết của bạn",
    },
  ];

  const createActivities = (item, index) => {
    return (
      <KeyboardAwareScrollView style={styles.list}>
        <Image source={{ uri: item.myID.avatar }} style={styles.listImg} />
        <Text style={styles.listContent}>
          <Text style={styles.author}>{item.myID.displayName}{" "}</Text>
          <Text>{item.messenger}</Text>
        </Text>
      </KeyboardAwareScrollView>
    );
  };
{}
  return (
    <View style={styles.container}>
      <View style={styles.headerPanel}>
        <Text style={styles.headerLogo}>Activities</Text>
      </View>
      <FlatList
        style={styles.listAct}
        data={activityList}
        renderItem={({ item, index }) => createActivities(item, index)}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    color: "#fff",
  },
  list: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 5,
    flexDirection: "row",
    // alignItems: "center",
  },
  listImg: {
    borderRadius: 100,
    width: 50,
    height: 50,
    margin: 5,
  },
  rightContent: {
    top: 0,
  },
  author: {
    fontWeight: "bold",
  },
});

export default ActivitiesTab;
