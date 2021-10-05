import React from "react";
import { View, TextInput } from "react-native";

import styles from "./styles";

const PlainInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  styles: stylesProps = {},
}) => {
  return (
    <View style={{ ...styles.inputContainer, ...stylesProps}}>
      <TextInput
        placeholder={placeholder}
        underlineColorAndroid="rgba(0, 0, 0, 0)"
        onChangeText={onChangeText}
        autoCapitalize="none"
        value={value}
        placeholderTextColor="gray"
        secureTextEntry={secureTextEntry}
        style={styles.textInput}
      />
    </View>
  );
};

export default PlainInput;
