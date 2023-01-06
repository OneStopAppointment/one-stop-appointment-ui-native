import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform } from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import * as Linking from "expo-linking";
import OTPScreen from "./screens/OTPScreen";

const prefix = Linking.createURL("/");
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};
const Stack = createNativeStackNavigator();
export default function App() {
  const [url, setUrl] = useState(null);
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        LoginScreen: "login",
        RegisterScreen: "register",
        OTPScreen: "otp",
      },
    },
  };

  function handleDeepLink(event) {
    let data = Linking.parse(event.url);
    if (Platform.OS === "ios" || Platform.OS === "android") {
      setUrl(data);
    } else if (Platform.OS === "web") {
    } else {
    }
  }

  async function getInitialURL() {
    const initialURL = await Linking.getInitialURL();
    console.log(initialURL);
    if (initialURL) {
      setUrl(Linking.parse(initialURL));
    }
  }

  useEffect(() => {
    const subscription = Linking.addEventListener("url", handleDeepLink);
    if (!url) {
      getInitialURL();
    }
    return () => {
      subscription.remove("url");
    };
  }, []);

  const RegisterComponent = (props) => (
    <RegisterScreen urlData={url} {...props} />
  );
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterComponent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OTPScreen"
            component={OTPScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
