import React from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { store } from '../../store/user';
import { PlainInput } from "../../components/InputField";
import { axios } from "../../config/axios";

const { height, width } = Dimensions.get("window");

class EmailSignUp extends React.Component {
  state = {
    email: "",
    password: "",
    rePassword: "",
    displayName: "",
    loading: false,
  }

  static navigationOptions = {
    title: "Email Address",
  };

  async signUpFn() {
    const {
      email,
      password,
      displayName,
    } = this.state;
    try {
      this.setState({ loading: true });
      const res = await axios.post('/api/register', {
        email,
        password,
        displayName,
      });

      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      email,
      password,
      rePassword,
      displayName,
      loading,
    } = this.state;

    return (
      <KeyboardAwareScrollView>

        <View style={styles.container}>
          <PlainInput
            placeholder="Enter your Email id"
            value={email}
            onChangeText={(val) => this.setState({ email: val })}
            styles={styles.marginBottom}
          />
          <PlainInput
            secureTextEntry
            placeholder="Password"
            value={password}
            onChangeText={(val) => this.setState({ password: val })}
            styles={styles.marginBottom}
          />
          <PlainInput
            secureTextEntry
            placeholder="Re-Password"
            value={rePassword}
            onChangeText={(val) => this.setState({ rePassword: val })}
            styles={styles.marginBottom}
          />
          <PlainInput
            placeholder="Display name"
            value={displayName}
            onChangeText={(val) => this.setState({ displayName: val })}
            styles={styles.marginBottom}
          />
          <TouchableOpacity
            style={[styles.inputWrapper, styles.btnContainer]}
            onPress={async () => {
              if (!email || !password || !rePassword || !displayName) {
                Alert.alert('Field is required !');
                return;
              }

              if (password !== rePassword) {
                Alert.alert('RePassword not match password');
                return;
              }

              const userRegisted = await this.signUpFn();
              store.setUser(userRegisted);
              Alert.alert('Register success!!', 'Please login now!');
              this.props.navigation.navigate("LoginScreen");
            }}
          >
            { loading ? <ActivityIndicator /> : (
              <Text style={{ color: "#fff" }}>Sign Up</Text>
            ) }
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  inputWrapper: {
    marginTop: 24
  },
  btnContainer: {
    height: 50,
    width: width * 0.9,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    paddingHorizontal: 12,
    alignSelf: "center",
    backgroundColor: "#0084ff"
  },
  marginBottom: {
    marginBottom: 24
  }
});

export default EmailSignUp;
