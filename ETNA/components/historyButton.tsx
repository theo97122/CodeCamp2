import { TouchableOpacity, Text, View, Route } from "react-native";
import { historyStyle } from "../styles/historyStyle";

export default function HistoryButton({ navigation, date }: any) {
  const handlePress = () => {
    navigation.navigate("Details", { date: date });
  };

  return (
    <TouchableOpacity
      style={historyStyle.historyButton}
      onPress={() => handlePress()}
    >
      <Text style={historyStyle.historyButtonText}>
        {date?.date} ({date?.moment})
      </Text>
    </TouchableOpacity>
  );
}
