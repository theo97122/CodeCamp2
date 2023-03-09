import {
  View,
  BackHandler,
  Text,
  TouchableOpacity,
  ScrollView,
  Route,
} from "react-native";
import { Key, useEffect, useState } from "react";
import { getAll } from "../api/getAllTrombi";
import homeStyle from "../styles/homeStyle";
import { AxiosError, AxiosResponse } from "axios";
import PromoButton from "../components/promoButton";
import { createHistory } from "../api/createHistory";
import { Promo } from "../../ETNA-API/src/interface/interface";

export default function Accueil({ navigation }: Route) {
  const [data, setData] = useState<Promo[]>([]);
  let promo: Promo[] = [];

  BackHandler.addEventListener("hardwareBackPress", function () {
    navigation.goBack();
    return true;
  });

  const newHistory = async (navigation: Route) => {
    createHistory();
    navigation.navigate("Emargement");
  };

  useEffect(() => {
    getAll()
      .then((res: AxiosResponse) => {
        for (let i = 0; i < res.data.length; i++) {
          promo.push(res.data[i]);
        }
        setData(promo);
      })
      .catch((err: AxiosError) => {
        console.log(err.response);
      });
  }, []);

  return (
    <View style={homeStyle.container}>
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={homeStyle.button}
          onPress={() => newHistory(navigation)}
        >
          <Text style={homeStyle.buttonText}> LANCER L'ÉMARGEMENT </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={homeStyle.buttonHistory}
          onPress={() => navigation.navigate("History")}
        >
          <Text style={homeStyle.buttonText}> HISTORIQUE </Text>
        </TouchableOpacity>
        {data?.map((promo: Promo, key: Key) => (
          <PromoButton key={key} navigation={navigation} promo={promo} />
        ))}
      </ScrollView>
    </View>
  );
}
