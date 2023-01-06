import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import OTPTextInput from "react-native-otp-textinput";
import { theme } from "../core/theme";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import Header from "../components/Header";

export default function OTPScreen({ navigation }) {
  let otpInput = useRef(null);

  const clearText = (e) => {
    otpInput.clear();
  };

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.otpContainer}>
          <BackButton goBack={() => navigation.navigate("LoginScreen")} />
          <Logo />
          <Header>Please Enter OTP</Header>
          <OTPTextInput
            inputCount={6}
            textInputStyle={{ border: 1 }}
            ref={(e) => (otpInput = e)}
          />
          <View style={styles.resendOtp}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPasswordScreen")}
            >
              <Text style={styles.label}>Resend OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Submit" onPress={clearText} />
          </View>
          <View style={styles.button}>
            <Button title="Clear" onPress={clearText} />
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  otpContainer: {
    flex: 5,
    alignItems: "center",
    paddingTop: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  resendOtp: {
    marginTop: 20,
  },
  label: {
    color: theme.colors.primary,
  },
});
