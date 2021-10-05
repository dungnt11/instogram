import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  Foundation,
  Feather,
  MaterialIcons,
  Ionicons
} from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import LoginScreen from "./screens/authScreens/LoginScreen";
import SignUpScreen from "./screens/authScreens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import CameraScreen from "./screens/CameraScreen";
import SearchScreen from "./screens/SearchScreen";
import ProfileScreen from "./screens/ProfileScreen";
import NotificationScreen from "./screens/NotificationScreen";

function AuthStack () {
  return (
    <Stack.Navigator
      tabBarOptions={{
        showLabel: false,
        headerShown: false,
      }}
      initialRouteName="SignUpScreen"
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  const HomeComp = () => <HomeScreen {...props} />;
  const ProfileComp = () => <ProfileScreen {...props} />;
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeComp}
        options={{
          tabBarIcon: ({ focused }) => (
            <Foundation
              name="home"
              size={28}
              color={focused ? "black" : "gray"}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Feather
              name="search"
              size={28}
              color={focused ? "black" : "gray"}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="add-box"
              size={28}
              color={focused ? "black" : "gray"}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Foundation
              name="heart"
              size={28}
              color={focused ? "black" : "gray"}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileComp}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="md-person"
              size={28}
              color={focused ? "black" : "gray"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Routes = () => (
  <Stack.Navigator initialRouteName="AppStack">
    <Stack.Screen
      options={{ headerShown: false }}
      name="AuthStack"
      component={AuthStack}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="AppStack"
      component={AppStack}
    />
  </Stack.Navigator>
);

export default Routes;
