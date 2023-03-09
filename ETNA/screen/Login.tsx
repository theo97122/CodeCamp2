import { useState } from "react";
import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  Route,
} from "react-native";
import loginStyle from "../styles/loginStyle";
import Icon from "react-native-vector-icons/FontAwesome";
import Auth from "../api/login";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { TouchableOpacity } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function Login({ navigation }: Route) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [fontsLoaded] = useFonts({
    "RobotoSlab-Regular": require("../assets/fonts/Roboto_Slab/RobotoSlab-Regular.ttf"),
    "RobotoSlab-Bold": require("../assets/fonts/Roboto_Slab/RobotoSlab-Bold.ttf"),
    "RobotoSlab-SemiBold": require("../assets/fonts/Roboto_Slab/RobotoSlab-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const handleLogin = async () => {
    Auth({ login, password }, navigation);
  };

  const RCTNetworking = require("react-native/Libraries/Network/RCTNetworking");
  RCTNetworking.clearCookies(() => {});

  if (!fontsLoaded) {
    return null;
  }

  // Render for iOS

  if (Platform.OS === "ios") {
    return (
      <KeyboardAvoidingView
        style={loginStyle.container}
        onLayout={onLayoutRootView}
        behavior="padding"
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
      >
        <Image style={loginStyle.logo} source={require("../assets/user.png")} />
        <Text style={loginStyle.mainText}> AUTHENTIFICATION </Text>
        <View style={loginStyle.input}>
          <Icon style={loginStyle.user} name="user" size={20} color="black" />
          <TextInput
            placeholder="NOM D'UTILISATEUR"
            style={loginStyle.inputText}
            value={login}
            onChangeText={setLogin}
          />
        </View>
        <View style={loginStyle.input}>
          <Icon style={loginStyle.lock} name="lock" size={20} color="black" />
          <TextInput
            placeholder="MOT DE PASSE"
            style={loginStyle.inputText}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={loginStyle.button} onPress={handleLogin}>
          <Text style={loginStyle.buttonText}> CONNEXION </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );

    // Render for others OS
  } else {
    return (
      <View style={loginStyle.container} onLayout={onLayoutRootView}>
        <Image style={loginStyle.logo} source={require("../assets/user.png")} />
        <Text style={loginStyle.mainText}> AUTHENTIFICATION </Text>
        <View style={loginStyle.input}>
          <Icon style={loginStyle.user} name="user" size={20} color="black" />
          <TextInput
            placeholder="NOM D'UTILISATEUR"
            style={loginStyle.inputText}
            value={login}
            onChangeText={setLogin}
          />
        </View>
        <View style={loginStyle.input}>
          <Icon style={loginStyle.lock} name="lock" size={20} color="black" />
          <TextInput
            placeholder="MOT DE PASSE"
            style={loginStyle.inputText}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={loginStyle.button} onPress={handleLogin}>
          <Text style={loginStyle.buttonText}> CONNEXION </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
