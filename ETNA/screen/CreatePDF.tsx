import { Route, View } from "react-native";
import GeneratePDF from "../components/generatePDF";

export default function CreatePDF({ route }: Route) {
  const { id } = route.params;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <GeneratePDF id={id} />
    </View>
  );
}
