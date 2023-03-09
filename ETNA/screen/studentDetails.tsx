import { View, Route } from "react-native";
import StudentCardDetails from "../components/studentCardDetails";

export default function StudentDetails({ route }: Route) {
  const { student } = route.params;

  return (
    <View>
      <StudentCardDetails student={student} />
    </View>
  );
}
