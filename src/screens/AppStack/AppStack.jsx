import { Feather, Foundation, Ionicons, Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
// import { StyleSheet } from "react-native";
import ActivitiesTab from "./ActivitiesTab/index";
import HomeTab from "./HomeTab";
import ProfileTab from "./ProfileTab";
// import SearchTab from "./SearchTab";
import ChatTab from "./ChatTab";
import CameraScreen from "./HomeTab/CameraScreen/index";
const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        headerShown: false,
        tabStyle: { backgroundColor: "#222" },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          tabBarIcon: ({ focused }) => (
            <Foundation
              name="home"
              size={30}
              color={focused ? "#fff" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Feather
              name="camera"
              size={30}
              color={focused ? "#fff" : "gray"}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="SearchTab"
        component={SearchTab}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Feather
              name="search"
              size={30}
              color={focused ? "#fff" : "gray"}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="ChatTab"
        component={ChatTab}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ focused }) => (
            <Entypo name="chat" size={30} color={focused ? "#fff" : "gray"} />
          ),
        }}
      />
      <Tab.Screen
        name="ActivitiesTab"
        component={ActivitiesTab}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Foundation
              name="heart"
              size={30}
              color={focused ? "#fff" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileTab}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="md-person"
              size={30}
              color={focused ? "#fff" : "gray"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
