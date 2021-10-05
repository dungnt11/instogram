import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { axios } from '../../config/axios';
import { store } from '../../store/user';

import { StyleSheet, Dimensions } from "react-native";

import { PlainInput } from "../../components/InputField";
import { IconButton, Button } from "../../components/Button";
import { LanguagePopUp } from "../../components/PopUp";

const { width } = Dimensions.get("window");

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedLanguage: "English",
      selectLanguageId: "1",
      loading: false,
      email: '',
      password: '',
      error: '',
    };
  }

  instaLogin = async () => {
    const { email, password } = this.state;
    try {
      this.setState({ loading: true });
      const res = await axios.post('/api/login', { email, password });
      return res.data;
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      loading,
      email,
      password,
      error,
    } = this.state;
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={{ alignItems: "center", paddingTop: 20 }}
          onPress={() => this.setState({ modalVisible: true })}
        >
          <Text>{this.state.selectedLanguage}</Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.titleText}>Instagram</Text>

          <View style={styles.inputWrapper}>
            <PlainInput
              placeholder="Phone number, email address or username"
              value={email}
              onChangeText={(newUsername) => {
                this.setState({ email: newUsername, error: '' });
              }}
            />
          </View>

          <View style={styles.inputWrapper}>
            <PlainInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={(newPassword) => {
                this.setState({ password: newPassword, error: '' });
              }}
            />
          </View>
          { error ? <Text style={styles.error}>Wrong username or password!</Text> : null }

          <View style={styles.inputWrapper}>
            { loading ? <ActivityIndicator /> : (
              <Button title="Log in" onPress={async () => {
                try {
                  const userData = await this.instaLogin();
                  if (userData) {
                    store.setUser(userData);
                    this.props.navigation.navigate("AppStack");
                  }
                } catch (error) {
                  console.log(error);
                }
              }} />
            ) }
          </View>

          <View style={styles.inputWrapper}>
            <Text style={{ fontSize: 12, color: "gray", fontFamily: "Roboto" }}>
              Forgotten your login details?{" "}
              <Text style={{ color: "#000" }}>Get help with signing in.</Text>
            </Text>
          </View>

          <View style={[styles.inputWrapper, styles.textWrapper]}>
            <View style={styles.line} />
            <Text style={styles.textStyle}>OR</Text>
          </View>

          <View style={styles.inputWrapper}>
            <IconButton
              title="Log in as"
              onPress={() => this.props.navigation.navigate("AppStack")}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.footerContainer}
          onPress={() => this.props.navigation.navigate("SignUpScreen")}
        >
          <Text style={{ color: "gray", fontFamily: "Roboto" }}>
            Don't have an account?<Text style={{ color: "#000" }}>
              Sign up.
            </Text>
          </Text>
        </TouchableOpacity>
        <LanguagePopUp
          visible={this.state.modalVisible}
          language={dataFromChild =>
            this.setState({ selectedLanguage: dataFromChild })
          }
          onRequestClose={dataReceived =>
            this.setState({
              modalVisible: false,
              selectLanguageId: dataReceived
            })
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    fontFamily: "lobster_regular",
    fontSize: 56
  },
  inputWrapper: {
    marginTop: 20
  },
  textWrapper: {
    width: width * 0.9,
    alignItems: "center",
    position: "relative"
  },
  line: {
    height: 1,
    backgroundColor: "#A9A9A9",
    position: "absolute",
    top: 7,
    width: width * 0.9
  },
  textStyle: {
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "white",
    paddingHorizontal: 8,
    fontFamily: "Roboto",
    color: "gray"
  },
  footerContainer: {
    borderTopWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    paddingVertical: 18
  },
  error: {
    color: '#d95038',
    marginTop: 5
  }
});

export default LoginScreen;
