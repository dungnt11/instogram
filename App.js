import React from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/screens/AppNavigator';
import { Text } from 'react-native';

export default () => {
  let [fontsLoaded] = useFonts({
    "lobster_regular": require("./assets/fonts/Lobster/Lobster-Regular.ttf"),
    "Roboto": require("./assets/fonts/Roboto/Roboto-Regular.ttf")
  });

  if (!fontsLoaded) {
    return <Text>Loading..</Text>;
  } else {
    return (
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );
  }
};
