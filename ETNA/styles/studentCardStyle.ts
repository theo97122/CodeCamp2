import { StyleSheet } from "react-native";

export const studentCardStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 10,
  },
  absent: {
    position: "absolute",
    left: 2.5,
    top: 2.5,
    zIndex: 1,
    width: 20,
    height: 20,
    borderRadius: 25,
    backgroundColor: "#B90E0A",
  },
  retard: {
    position: "absolute",
    left: 2.5,
    top: 2.5,
    zIndex: 1,
    width: 20,
    height: 20,
    borderRadius: 25,
    backgroundColor: "darkyellow",
  },
});
