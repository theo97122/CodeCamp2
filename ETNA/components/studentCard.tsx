import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import { enrolled } from "../api/enrolled";
import { studentCardStyle } from "../styles/studentCardStyle";
import { useReducer } from "react";

export default function StudentCard({ student, date, navigation }: any) {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const convertTime = (time: any) => {
    if (time) {
      const [hoursStr, minutesStr] = time.split(":");
      const hours = parseInt(hoursStr);
      const minutes = parseInt(minutesStr);

      if (date.moment === "matin") {
        if (hours === 9 && minutes >= 0 && minutes <= 30) {
          return <Text style={{ color: "yellow" }}> {time} </Text>;
        } else if (
          hours > 9 ||
          (hours === 9 && minutes > 30) ||
          time === "00:00:00" ||
          time === "NON ÉMARGÉ"
        ) {
          return <Text style={{ color: "red" }}> {time} </Text>;
        } else {
          return <Text style={{ color: "green" }}> {time} </Text>;
        }
      } else if (date.moment === "après-midi") {
        if (hours <= 18 && time !== "00:00:00" && time !== "NON ÉMARGÉ") {
          return <Text style={{ color: "green" }}> {time} </Text>;
        } else {
          return <Text style={{ color: "red" }}> {time} </Text>;
        }
      }
    }
  };

  const handlePress = () => {
    if (student.arrival === "NON ÉMARGÉ") {
      Alert.alert("Attention !", `Souhaitez-vous marquer l'étudiant absent ?`, [
        {
          text: "OK",
          onPress: () => {
            enrolled(student.login, date, date.moment);
            student.arrival = "00:00:00";
            forceUpdate();
          },
        },
        {
          text: "Annuler",
          onPress: () => {},
        },
      ]);
      return;
    }
    navigation.navigate("StudentDetails", { student: student });
  };

  return (
    <TouchableOpacity
      style={studentCardStyle.container}
      onPress={() => handlePress()}
    >
      <Image
        style={studentCardStyle.image}
        source={{
          uri: `https://auth.etna-alternance.net/api/users/${student.login}/photo`,
        }}
      />
      <Text style={studentCardStyle.textContainer}> {student.login} </Text>
      <View style={{ alignItems: "flex-end" }}>
        <Text> {student.firstname} </Text>
        <Text> {student.lastname} </Text>
        {convertTime(student.arrival)}
      </View>
    </TouchableOpacity>
  );
}
