import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, IconButton } from "../../../components/Button";
import { PlainInput } from "../../../components/InputField";
import { LanguagePopUp } from "../../../components/PopUp";
import { axios } from "../../../config/axios";
import { store } from "../../../store/user";

const { width } = Dimensions.get("window");

const SignInScreen = (props) => {
  const { navigation } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectLanguageId, setSelectLanguageId] = useState("1");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSignIn = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/login", { email, password });
      await AsyncStorage.setItem('@user', JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const navigationOptions = {
    header: null,
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={{ alignItems: "center", paddingTop: 20 }}
        onPress={() => setModalVisible(true)}
      >
        <Text>{selectedLanguage}</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titleText}>Instagram</Text>

        <View style={styles.inputWrapper}>
          <PlainInput
            placeholder="Phone number, email address or username"
            value={email}
            onChangeText={(newUsername) => {
              setEmail(newUsername);
              setError("");
            }}
          />
        </View>

        <View style={styles.inputWrapper}>
          <PlainInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(newPassword) => {
              setPassword(newPassword);
              setError("");
            }}
          />
        </View>
        {error ? (
          <Text style={styles.error}>Wrong username or password!</Text>
        ) : null}

        <View style={styles.inputWrapper}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Button
              title="Sign In"
              onPress={async () => {
                try {
                  const userData = await onSignIn();
                  if (userData) {
                    store.setUser(userData);
                    props.navigation.navigate("AppStack");
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            />
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.footerContainer}
        onPress={() => navigation.navigate("SignUpScreen")}
      >
        <Text style={{ color: "gray", fontFamily: "Roboto" }}>
          Don't have an account?
          <Text style={{ color: "#5851db" }}> Sign up</Text>
        </Text>
      </TouchableOpacity>
      <LanguagePopUp
        visible={modalVisible}
        language={(dataFromChild) => setSelectedLanguage(dataFromChild)}
        onRequestClose={(dataReceived) => {
          setModalVisible(false);
          setSelectLanguageId(dataReceived);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#111",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontFamily: "lobster_regular",
    fontSize: 56,
    color: "#5851db",
  },
  inputWrapper: {
    marginTop: 20,
  },
  textWrapper: {
    width: width * 0.9,
    alignItems: "center",
    position: "relative",
  },
  line: {
    height: 1,
    backgroundColor: "#A9A9A9",
    position: "absolute",
    top: 7,
    width: width * 0.9,
  },
  textStyle: {
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "white",
    paddingHorizontal: 8,
    fontFamily: "Roboto",
    color: "gray",
  },
  footerContainer: {
    borderTopWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    paddingVertical: 18,
  },
  error: {
    color: "#d95038",
    marginTop: 5,
  },
});

export default SignInScreen;
