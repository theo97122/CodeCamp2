import { StyleSheet } from "react-native";

export const historyStyle = StyleSheet.create({
  historyButton: {
    width: 350,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C147E9",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#810CA8",
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  historyButtonText: {
    color: "white",
    fontFamily: "RobotoSlab-Regular",
  },
  searchBar: {
    color: "black",
    backgroundColor: "#fff",
    width: 350,
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 25,
    padding: 10,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
