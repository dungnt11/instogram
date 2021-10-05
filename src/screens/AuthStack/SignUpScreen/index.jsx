import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EmailSignUp from "./EmailSignUp";
import PhoneSignup from "./PhnSignup";

const { height, width } = Dimensions.get("window");
const Tab = createBottomTabNavigator();

const SignUpScreen = (props) => {
  const {navigation} = props;


  const navigationOptions = {
    header: null,
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileImage}>
          <Feather name="user" size={78} color="white" />
        </View>
        {/* <Tab.Navigator
          tabBarOptions={{
            activeTintColor: "#000",
            inactiveTintColor: "#000",
            style: {
              backgroundColor: "#fff",
            },
            indicatorStyle: {
              backgroundColor: "#000",
            },
          }}
        > */}
        {/* <Tab.Screen name="EmailSignUp" component={EmailSignUp} />
          <Tab.Screen name="PhoneSignup" component={PhoneSignup} /> */}
        {/* </Tab.Navigator> */}
        <EmailSignUp />
      </ScrollView>

      <TouchableOpacity
        style={styles.footerContainer}
        onPress={() => navigation.navigate("SignInScreen")}
      >
        <Text style={{ color: "gray", fontFamily: "Roboto" }}>
          Already have an account?
          <Text style={{ color: "#5851db" }}> Sign in</Text>
        </Text>
      </TouchableOpacity>
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
  },
  profileImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.4,
    borderWidth: 2,
    borderColor: "#fff",
    alignSelf: "center",
    marginTop: height * 0.12,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  footerContainer: {
    borderTopWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    paddingVertical: 18,
  },
});

export default SignUpScreen;
