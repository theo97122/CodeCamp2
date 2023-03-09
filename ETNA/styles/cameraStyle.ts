import { StyleSheet } from "react-native";

const cameraStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  topcontrol: {
    width: "100%",
    height: 120,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    left: 0,
  },
  bottomcontrol: {
    width: "100%",
    height: 120,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  mainText: {
    fontSize: 22,
    fontFamily: "RobotoSlab-Regular",
    textAlign: "center",
    marginTop: 40,
  },
  flip: {
    width: 75,
    height: 75,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 25,
  },
});

export default cameraStyle;
