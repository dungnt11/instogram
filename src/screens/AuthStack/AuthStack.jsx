import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import { store } from "../../store/user";

const Stack = createStackNavigator();

const AuthStack = (props) => {
  React.useEffect(() => {
    AsyncStorage
      .getItem('@user')
      .then((res) => JSON.parse(res))
      .then((user) => {
        props.navigation.navigate('AppStack');
        store.setUser(user);
      }).catch(console.log);
  }, []);

  return (
    <Stack.Navigator
      tabBarOptions={{
        showLabel: false,
        headerShown: false,
      }}
      initialRouteName="SignInScreen"
    >
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
