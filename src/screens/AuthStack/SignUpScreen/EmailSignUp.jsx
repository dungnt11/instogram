import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { PlainInput } from "../../../components/InputField";
import { axios } from "../../../config/axios";
import { store } from "../../../store/user";

const { height, width } = Dimensions.get("window");

const EmailSignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigationOptions = {
    title: "Email Address",
  };

  const signUpFn = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/register", {
        email,
        password,
        displayName,
      });

      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView style={{backgroundColor: '#111'}}>
      <View style={styles.container}>
        <PlainInput
          placeholder="Enter your Email id"
          value={email}
          onChangeText={(val) => setEmail(val)}
          styles={styles.marginBottom}
        />
        <PlainInput
          secureTextEntry
          placeholder="Password"
          value={password}
          onChangeText={(val) => setPassword(val)}
          styles={styles.marginBottom}
        />
        <PlainInput
          secureTextEntry
          placeholder="Re-Password"
          value={rePassword}
          onChangeText={(val) => setRePassword(val)}
          styles={styles.marginBottom}
        />
        <PlainInput
          placeholder="Display name"
          value={displayName}
          onChangeText={(val) => setDisplayName(val)}
          styles={styles.marginBottom}
        />
        <TouchableOpacity
          style={[styles.inputWrapper, styles.btnContainer]}
          onPress={async () => {
            if (!email || !password || !rePassword || !displayName) {
              Alert.alert("Field is required !");
              return;
            }

            if (password !== rePassword) {
              Alert.alert("RePassword not match password");
              return;
            }

            const userRegisted = await signUpFn();
            store.setUser(userRegisted);
            Alert.alert("Register success!!", "Please login now!");
            props.navigation.navigate("SignInScreen");
          }}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={{ color: "#fff"}}>Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  inputWrapper: {
    marginTop: 24,
  },
  btnContainer: {
    height: 50,
    width: width * 0.9,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    paddingHorizontal: 12,
    alignSelf: "center",
    backgroundColor: "#5851db",
  },
  marginBottom: {
    marginBottom: 24,
  },
});

export default EmailSignUp;
