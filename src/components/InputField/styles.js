import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 50,
    width: width * 0.9,
    borderWidth: 1,
    borderColor: "#A9A9A9",
    justifyContent: "center",
    backgroundColor: "#222"
  },

  textInput: {
    fontSize: 16,
    color: "#fff",
  }
});
export default styles;
