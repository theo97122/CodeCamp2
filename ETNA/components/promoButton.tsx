import { TouchableOpacity, Text, Route } from "react-native";
import homeStyle from "../styles/homeStyle";

export default function PromoButton({ navigation, promo }: any) {
  return (
    <TouchableOpacity
      style={homeStyle.buttonPromo}
      onPress={() =>
        navigation.navigate(
          "Promo",
          { promo: promo },
          { navigation: navigation }
        )
      }
    >
      <Text style={homeStyle.buttonText}>
        {" "}
        {promo.wall_name + " " + promo.spe}{" "}
      </Text>
    </TouchableOpacity>
  );
}
