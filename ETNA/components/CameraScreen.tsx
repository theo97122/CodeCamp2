import { CameraType } from "expo-camera";
import { useState, useEffect, useRef } from "react";
import { View, Alert, Text, Image, TouchableOpacity } from "react-native";
import cameraStyle from "../styles/cameraStyle";
import { BarCodeScanner } from "expo-barcode-scanner";
import moment from "moment";
import { scan } from "../api/scan";

export default function CameraScreen() {
  const [permission, setPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await BarCodeScanner.requestPermissionsAsync();
      setPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const parseBarCode = (data: string) => {
    const result = data.split("|");
    return result[0];
  };

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    const today = moment(new Date()).format("DD/MM/YYYY");
    const now =
      moment().format("HH:mm:ss") < "12:00:00" ? "matin" : "après-midi";
    setScanned(true);
    scan(parseBarCode(data), today, now)
      .then((res) => {
        if (res.data.status === 200) {
          Alert.alert(
            "Félicitations !",
            `Vous avez bien été émargé ${parseBarCode(data)}.`,
            [
              {
                text: "OK",
                onPress: () => setScanned(false),
              },
            ]
          );
        }
        if (res.data.status === 401) {
          Alert.alert(
            "Erreur !",
            `Vous avez déjà été émargé ${parseBarCode(data)} !`,
            [
              {
                text: "OK",
                onPress: () => setScanned(false),
              },
            ]
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCameraType = () => {
    if (type === CameraType.back) {
      setType(CameraType.front);
    } else {
      setType(CameraType.back);
    }
  };

  return (
    <View style={cameraStyle.container}>
      <View style={cameraStyle.topcontrol}>
        <Text style={cameraStyle.mainText}> L'ÉMARGEMENT EST EN COURS... </Text>
      </View>
      <BarCodeScanner
        type={type}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={cameraStyle.camera}
      />
      <View style={cameraStyle.bottomcontrol}>
        <TouchableOpacity onPress={() => handleCameraType()}>
          <Image
            style={cameraStyle.flip}
            source={require("../assets/flip.png")}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
}
