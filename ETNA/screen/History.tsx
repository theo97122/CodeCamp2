import { useEffect, useState } from "react";
import { getAllHistory } from "../api/getAllHistory";
import { View, TextInput, Route } from "react-native";
import HistoryButton from "../components/historyButton";
import { historyStyle } from "../styles/historyStyle";
import { ListePresence } from "../interface/date";

export default function History({ navigation }: Route) {
  const [historyDate, setHistoryDate]: any = useState([]);
  const [dateSearch, setDateSearch]: any = useState("");
  let date: any[] = [];

  useEffect(() => {
    getAllHistory()
      .then((res) => {
        const result = res.data;

        for (let i = 0; i < result.data.length; i++) {
          date.push(result.data[i]);
        }
        date.reverse();
        setHistoryDate(date);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={{ marginTop: 25 }}>
      <TextInput
        style={historyStyle.searchBar}
        onChangeText={(text) => setDateSearch(text)}
        placeholder="Rechercher une date"
      />
      {historyDate
        ?.filter((date: any) => {
          return date.date.toLowerCase().includes(dateSearch.toLowerCase());
        })
        .map((date: any, key: any) => {
          return (
            <HistoryButton key={key} navigation={navigation} date={date} />
          );
        })}
    </View>
  );
}
