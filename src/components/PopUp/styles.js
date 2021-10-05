import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  modalPopup: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)"
  },
  modalIn: {
    backgroundColor: "#fff",
    padding: 15,
    width: 280,
    height: height * 0.9,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5
  }
});
export default styles;
