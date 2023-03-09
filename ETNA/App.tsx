import Login from "./screen/Login";
import Accueil from "./screen/Accueil";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Emargement from "./screen/Emargement";
import PromoList from "./screen/Promo";
import History from "./screen/History";
import HistoryDetails from "./screen/historyDetails";
import StudentDetails from "./screen/studentDetails";
import CreatePDF from "./screen/CreatePDF";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{ headerTitle: "CONNEXION" }}
          component={Login}
          listeners={() => ({
            focus: () => {
              const RCTNetworking = require("react-native/Libraries/Network/RCTNetworking");
              RCTNetworking.clearCookies(() => {});
            },
          })}
        />
        <Stack.Screen
          name="Home"
          options={{ headerTitle: "ACCUEIL" }}
          component={Accueil}
        />
        <Stack.Screen
          name="Emargement"
          options={{ headerTitle: "ÉMARGEMENT" }}
          component={Emargement}
        />
        <Stack.Screen
          name="Promo"
          options={{ headerTitle: "PROMO" }}
          component={PromoList}
          initialParams={{ promo: null }}
        />
        <Stack.Screen
          name="History"
          options={{ headerTitle: "HISTORIQUE" }}
          component={History}
        />
        <Stack.Screen
          name="Details"
          options={{
            headerTitle: "DÉTAIL DE L'HISTORIQUE",
          }}
          component={HistoryDetails}
        />
        <Stack.Screen
          name="StudentDetails"
          options={{ headerTitle: "DÉTAIL DE L'ÉTUDIANT" }}
          component={StudentDetails}
        />
        <Stack.Screen
          name="CreatePDF"
          options={{ headerTitle: "CRÉER UN PDF" }}
          component={CreatePDF}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
