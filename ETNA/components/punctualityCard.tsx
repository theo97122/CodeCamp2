import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { punctualityCardStyle } from "../styles/punctualityCard";
import { useState, useReducer } from "react";
import Justify from "../api/justifyIrregularity";
import DeleteIrregularity from "../api/deleteIrregularity";
import { UserV2 } from "../../ETNA-API/src/interface/interface";

export default function PunctualityCard({ retards, student, type }: any) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [commentary, setCommentary] = useState("");
  const [isJustified, setIsJustified] = useState(retards.justified);
  const [deleted, setDeleted] = useState(false);

  const submitChange = async () => {
    const userInfo = {
      login: student.login,
      justifying: commentary,
      date: retards.date,
      arrival: retards.arrival,
      type: type,
      boolean: !isJustified,
    };

    Justify(userInfo)
      .then((res) => {
        setIsJustified(!isJustified);
        Alert.alert(
          "Félicitations !",
          `L'irrégularité du ${retards.date} a bien été mise à jour.`,
          [
            {
              text: "OK",
            },
          ]
        );
      })
      .catch((err) => {
        console.log(err);
        alert(
          "Une erreur est survenue lors de la justification de l'irrégularité. Veuillez réessayer ultérieurement."
        );
      });
    setIsModalVisible(false);
  };

  const delIrregularity = async () => {
    const userInfo: UserV2 = {
      login: student.login,
      date: retards.date,
      arrival: retards.arrival,
      type: type,
    };

    DeleteIrregularity(userInfo)
      .then((res) => {
        Alert.alert(
          "Félicitations !",
          `L'irrégularité du ${retards.date} a bien été supprimée.`,
          [
            {
              text: "OK",
              onPress: () => {
                setDeleted(true);
              },
            },
          ]
        );
      })
      .catch((err) => {
        console.log(err);
        alert(
          "Une erreur est survenue lors de la suppression de l'irrégularité. Veuillez réessayer ultérieurement."
        );
      });
  };

  const handleLongPress = () => {
    Alert.alert(
      "Attention !",
      `Souhaitez-vous supprimer l'irrégularité du ${retards.date} ?`,
      [
        {
          text: "OK",
          onPress: () => {
            delIrregularity();
          },
        },
        {
          text: "Annuler",
          onPress: () => {},
        },
      ]
    );
  };

  if (deleted) return <View />;
  return (
    <TouchableOpacity
      style={punctualityCardStyle.container}
      onPress={() => setIsModalVisible(true)}
      onLongPress={() => handleLongPress()}
    >
      <View>
        <Text> {retards.date} </Text>
        <Text> {retards.arrival} </Text>
      </View>
      <View>
        {isJustified ? (
          <Text style={punctualityCardStyle.justifiedText}> JUSTIFIÉ </Text>
        ) : (
          <Text style={punctualityCardStyle.nonJustifiedText}>
            NON JUSTIFIÉ
          </Text>
        )}
      </View>
      {isJustified ? (
        <Modal
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
          transparent
        >
          <View style={punctualityCardStyle.popUpContainer}>
            <View style={punctualityCardStyle.popUpV2}>
              <Text style={punctualityCardStyle.popUpMainTextV2}>
                SUPPRIMER LA JUSTIFICATION DU {retards.date} ?
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => submitChange()}>
                  <Text style={punctualityCardStyle.popUpButton}>VALIDER</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                  <Text style={punctualityCardStyle.popUpButtonV2}>
                    ANNULER
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      ) : (
        <Modal
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
          transparent
        >
          <View style={punctualityCardStyle.popUpContainer}>
            <View style={punctualityCardStyle.popUp}>
              <Text style={punctualityCardStyle.popUpMainText}>
                JUSTIFIER L'IRRÉGULARITÉ DU {retards.date}
              </Text>
              <TextInput
                style={punctualityCardStyle.textArea}
                placeholder="RENTREZ LA JUSTIFICATION..."
                onChangeText={(text) => setCommentary(text)}
                multiline
              />
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => submitChange()}>
                  <Text style={punctualityCardStyle.popUpButton}>VALIDER</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                  <Text style={punctualityCardStyle.popUpButtonV2}>
                    ANNULER
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </TouchableOpacity>
  );
}
