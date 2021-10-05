import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AppStack from "./AppStack/AppStack";
import AuthStack from "./AuthStack/AuthStack";
import DetailChatStack from "./DetailChatStack";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="AuthStack">
      <Stack.Screen
        name="AuthStack"
        component={AuthStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailChatStack"
        component={DetailChatStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AppStack"
        component={AppStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
