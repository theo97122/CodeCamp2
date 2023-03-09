import { Key, useEffect, useState } from "react";
import {
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  Route,
} from "react-native";
import StudentCard from "../components/studentCard";
import { promoStyle } from "../styles/promoStyle";
import { getUserByPromo } from "../api/getUserByPromo";
import Student from "../interface/student";

export default function Promo({ route, navigation }: Route) {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState<string>("");
  const [isLateFilter, setIsLateFilter] = useState<boolean>(false);
  const [isAbsentFilter, setIsAbsentFilter] = useState<boolean>(false);

  let data = [];

  const { promo } = route.params;

  useEffect(() => {
    getUserByPromo(promo.id)
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigateToCreatePDF = () => {
    navigation.navigate("CreatePDF", {
      id: promo.id,
    });
  };

  return (
    <ScrollView>
      <TextInput
        style={promoStyle.searchBar}
        onChangeText={(text) => setSearch(text)}
        placeholder="Rechercher un étudiant"
      />
      <TouchableOpacity
        style={promoStyle.pdfButton}
        onPress={() => navigateToCreatePDF()}
      >
        <Text style={{ textAlign: "center", marginTop: 5, fontSize: 14 }}>
          PDF
        </Text>
      </TouchableOpacity>
      {students
        .filter((student: Student) => {
          if (
            isAbsentFilter &&
            student.isAbsent === true &&
            student.login.toLowerCase().includes(search.toLowerCase())
          ) {
            return student;
          } else if (
            isLateFilter &&
            student.isLate === true &&
            student.login.toLowerCase().includes(search.toLowerCase())
          ) {
            return student;
          } else if (
            !isLateFilter &&
            !isAbsentFilter &&
            student.login.toLowerCase().includes(search.toLowerCase())
          ) {
            return student;
          }
        })
        .map((student: Student, key: Key) => {
          return (
            <StudentCard key={key} student={student} navigation={navigation} />
          );
        })}
    </ScrollView>
  );
}
