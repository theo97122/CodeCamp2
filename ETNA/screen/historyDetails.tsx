import StudentCard from "../components/studentCard";
import { Route, ScrollView, View } from "react-native";
import { useState } from "react";
import { Key } from "react";
import PromoTag from "../components/promoTag";
import Student from "../interface/student";

export default function HistoryDetails({ route, navigation }: Route) {
  const [currentPromo, setCurrentPromo] = useState<number>(813);
  const [filter, setFilter] = useState<string>("TOUS");
  const { date } = route.params;
  const user = date?.users;

  return (
    <ScrollView>
      <PromoTag setPromo={setCurrentPromo} setFilter={setFilter} />
      {user
        ?.filter((student: Student) => {
          if (student.promo.id === currentPromo && filter === "TOUS") {
            return student;
          } else if (
            student.promo.id === currentPromo &&
            filter === "NON ÉMARGÉ" &&
            student.arrival === "NON ÉMARGÉ"
          ) {
            return student;
          } else if (
            (student.promo.id === currentPromo &&
              filter === "ABSENT" &&
              student.arrival !== "NON ÉMARGÉ" &&
              ((student.arrival > "09:30:00" &&
                student.arrival <= "12:00:00") ||
                student.arrival === "00:00:00")) ||
            (student.arrival > "18:00:00" && student.arrival < "00:00:00")
          ) {
            return student;
          } else if (
            student.promo.id === currentPromo &&
            filter === "RETARD" &&
            student.arrival > "09:00:00" &&
            student.arrival < "09:30:00"
          ) {
            return student;
          }
        })
        .sort((a: Student, b: Student) => a.login.localeCompare(b.login))
        .map((student: Student, key: Key) => {
          return (
            <StudentCard
              key={key}
              student={student}
              date={date}
              navigation={navigation}
            />
          );
        })}
    </ScrollView>
  );
}
