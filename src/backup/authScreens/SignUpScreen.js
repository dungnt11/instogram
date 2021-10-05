import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet, Dimensions,
} from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PhoneSignup from "./PhnSignup";
import EmailSignUp from "./EmailSignUp";

const { height, width } = Dimensions.get("window");
const Tab = createBottomTabNavigator();

class SignUpScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.profileImage}>
            <Feather name="user" size={78} color="black" />
          </View>
          <Tab.Navigator
              tabBarOptions={{
                activeTintColor: "#000",
                inactiveTintColor: "#000",
                style: {
                  backgroundColor: "#fff"
                },
                indicatorStyle: {
                  backgroundColor: "#000"
                },
              }}
            >
              <Tab.Screen
                name="EmailSignUp"
                component={EmailSignUp}
              />
              <Tab.Screen
                name="PhoneSignup"
                component={PhoneSignup}
              />
          </Tab.Navigator>
        </ScrollView>

        <TouchableOpacity
          style={styles.footerContainer}
          onPress={() => this.props.navigation.navigate("LoginScreen")}
        >
          <Text style={{ color: "gray", fontFamily: "Roboto" }}>
            Already have an account?<Text style={{ color: "#000" }}>
              Log in.
            </Text>
          </Text>
        </TouchableOpacity>
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
    flex: 1
  },
  profileImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.4,
    borderWidth: 2,
    alignSelf: "center",
    marginTop: height * 0.12,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  footerContainer: {
    borderTopWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    paddingVertical: 18
  }
});

export default SignUpScreen;
