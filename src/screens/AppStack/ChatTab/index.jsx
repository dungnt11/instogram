import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import { Loader } from '../../../components/Loader';
import { axios } from '../../../config/axios';
import { store } from '../../../store/user';

const { width, height } = Dimensions.get("window");

const ChatTab = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [friends, setFriends] = React.useState([]);

  React.useEffect(() => {
    async function prepare() {
      try {
        const res = await axios.get('/api/friend');
        setFriends(res.data);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    }

    prepare();
  }, []);

  function goChatDetail(_id) {
    props.navigation.navigate('DetailChatStack', { _id });
  }

  return (
    <View style={styles.container}>
      <Loader loading={loading} text="Loading..." />
      {
        friends.map((friendItem) => {
          if (friendItem._id !== store.user._id) {
            return (
              <TouchableOpacity key={friendItem._id} onPress={() => goChatDetail(friendItem._id)}>
                <View style={styles.person}>
                  <Image style={styles.profileImage} source={{ uri: friendItem.avatar }} />
                  <Text style={styles.name}>{ friendItem.displayName }</Text>
                </View>
              </TouchableOpacity>
            );
          }
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
  },
  person: {
    flexDirection: 'row',
    marginLeft: width * 0.02,
    marginBottom: width * 0.02,
    alignItems: 'center',
  },
  name: {
    marginLeft: width * 0.05,
  },
  profileImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.4,
    borderWidth: 1,
  }
});

export default ChatTab;
