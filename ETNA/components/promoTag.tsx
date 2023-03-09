import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Text, ScrollView, TouchableOpacity, View } from "react-native";
import { getAll } from "../api/getAllTrombi";
import { promoStyle } from "../styles/promoStyle";

export default function PromoTag({ setPromo, setFilter }: any) {
  const [data, setData]: any = useState([]);
  let promo: any = [];

  useEffect(() => {
    getAll()
      .then((res: AxiosResponse) => {
        for (let i = 0; i < res.data.length; i++) {
          promo.push(res.data[i]);
        }
        setData(promo.reverse());
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <View
      style={{
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
        flexDirection: "column",
      }}
    >
      <ScrollView
        style={{ marginLeft: "auto", marginRight: "auto" }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          style={promoStyle.promoTagV2}
          onPress={() => setFilter("TOUS")}
        >
          <Text style={promoStyle.promoTagText}>TOUS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={promoStyle.promoTagV2}
          onPress={() => setFilter("NON ÉMARGÉ")}
        >
          <Text style={promoStyle.promoTagText}>NON ÉMARGÉ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={promoStyle.promoTagV2}
          onPress={() => setFilter("ABSENT")}
        >
          <Text style={promoStyle.promoTagText}>ABSENT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={promoStyle.promoTagV2}
          onPress={() => setFilter("RETARD")}
        >
          <Text style={promoStyle.promoTagText}>RETARD</Text>
        </TouchableOpacity>
      </ScrollView>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data?.map((promo: any, key: any) => {
          return (
            <TouchableOpacity
              key={key}
              style={promoStyle.promoTag}
              onPress={() => setPromo(parseInt(promo.id))}
            >
              <Text
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                  padding: 5,
                  fontFamily: "RobotoSlab-Regular",
                }}
              >
                {promo.wall_name.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
