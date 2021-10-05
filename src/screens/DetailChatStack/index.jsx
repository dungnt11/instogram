import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { View, Dimensions, Text, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { store } from '../../store/user';
import { firebase } from '../../firebase';

const { width, height } = Dimensions.get("window");

const DetailChatTab = ({ route, navigation }) => {
  const { _id: toIDUser } = route.params;
  const [messages, setMessages] = React.useState([]);
  const loaded = React.useRef();

  React.useEffect(() => {
    firebase.default
      .database()
      .ref('/chat')
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          const messNew = [];
          const chatObject = Object.values(snapshot.val() || {});
          if (chatObject.length) {
            chatObject.forEach((chatObj, ind) => {
              const chatContent = {
                  _id: Object.keys(snapshot.val())[ind],
                  text: chatObj.text,
                  createdAt: chatObj.createdAt,
                  toIDUser: chatObj.toID,
                  user: {
                    _id: chatObj.myID,
                    name: chatObj.name,
                    avatar: chatObj.avatar,
                  },
                };
                messNew.push(chatContent);
            });
          }
          setMessages(messNew.reverse());
          loaded.current = true;
        }
      });
  }, []);

  const onSend = React.useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    const { _id, text, user } = messages[0];
    firebase.default
      .database()
      .ref('/chat')
      .push({
        uid: _id,
        myID: user._id,
        toID: toIDUser,
        avatar: user.avatar,
        createdAt: String(new Date()),
        name: user.name,
        text,
      });
  }, []);

  function backFn() {
    navigation.goBack();
  }

  return (
    <View style={{ width, height }}>
      <TouchableOpacity onPress={backFn} style={{ marginTop: Constants.statusBarHeight, flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="chevron-back" size={24} color="black" />
        <Text>Back</Text>
      </TouchableOpacity>
      <GiftedChat
          messages={messages.filter((e) => e.toIDUser === toIDUser && e.user._id === store.user._id || e.toIDUser === store.user._id && e.user._id === toIDUser)}
          showAvatarForEveryMessage={true}
          onSend={messages => onSend(messages)}
          user={{
              _id: store.user._id,
              name: store.user.displayName,
              avatar: store.user.avatar,
          }}
      />
    </View>
  );
}

export default DetailChatTab;
