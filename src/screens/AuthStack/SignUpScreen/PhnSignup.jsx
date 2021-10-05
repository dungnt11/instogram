import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PlainInput } from "../../../components/InputField";

const { height, width } = Dimensions.get("window");
const PhnSignup = () => {
  const navigationOptions = {
    title: "Phone Number",
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <PlainInput placeholder="Enter your phone number" />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={{ textAlign: "center" }}>
          You may receive SMS updates from Instagram and can opt out at any
          time.
        </Text>
      </View>
      <TouchableOpacity style={[styles.inputWrapper, styles.btnContainer]}>
        <Text style={{ color: "#fff" }}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  inputWrapper: {
    marginTop: 24,
    paddingHorizontal: 12,
    alignSelf: "center",
  },
  btnContainer: {
    height: 50,
    width: width * 0.9,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: "#0084ff",
  },
});

export default PhnSignup;
