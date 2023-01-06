import React, { memo, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import HeaderSmall from "../components/HeaderSmall";
// import { emailValidator, passwordValidator } from "../core/utils";
// import { Navigation } from "../types";

const LoginScreen = ({ navigation }) => {
  const [mobileEnable, setMobileEnable] = useState(true);
  const [emailPwdEnable, setEmailPwdEnable] = useState(true);
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [mobile, setMobile] = useState({ value: "", error: "" });

  const _onLoginPressed = () => {
    console.log("hi");
    const validEmailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validPwdRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const mobileRegex = /^[6-9]\d{9}$/;

    const emailError = email.value.match(validEmailRegex)
      ? ""
      : "Please provide valid email id";

    const passwordError = password.value.match(validPwdRegex)
      ? ""
      : "Password Must be minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character";

    const mobileError = mobile.value.match(mobileRegex)
      ? ""
      : "Please provide a valid mobile number";

    if (emailError || passwordError || mobileError) {
      if (emailPwdEnable && (emailError || passwordError)) {
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        setMobile({ value: "", error: "" });
        return;
      } else if (mobileEnable && mobileError) {
        setMobile({ ...mobile, error: mobileError });
        setEmail({ value: "", error: "" });
        setPassword({ value: "", error: "" });
        return;
      }
    }
    if (mobileEnable) {
      navigation.navigate("OTPScreen");
    } else if (emailPwdEnable) {
    }
  };

  const mobileInputHandleChange = (text) => {
    if (text.replace(/[^0-9]/g, "")) {
      setEmailPwdEnable(false);
    } else {
      setEmailPwdEnable(true);
    }
    setMobile({ value: text.replace(/[^0-9]/g, ""), error: "" });
  };

  const emailPwdInputHandleChange = (text, type) => {
    if (text) {
      setMobileEnable(false);
    } else {
      setMobileEnable(true);
    }
    if (type === "email") {
      setEmail({ value: text, error: "" });
    } else if (type === "pwd") {
      setPassword({ value: text, error: "" });
    }
  };

  return (
    <Background>
      <Logo />

      <Header>Welcome back.</Header>
      <TextInput
        label="Mobile No."
        returnKeyType="done"
        value={mobile.value}
        onChangeText={(text) => mobileInputHandleChange(text)}
        error={!!mobile.error}
        errorText={mobile.error}
        autoCapitalize="none"
        autoCompleteType="mobile"
        keyboardType="number-pad"
        editable={mobileEnable}
        style={mobileEnable ? styles.editable : styles.notEditable}
      />
      <HeaderSmall>-- OR --</HeaderSmall>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => emailPwdInputHandleChange(text, "email")}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        editable={emailPwdEnable}
        style={emailPwdEnable ? styles.editable : styles.notEditable}
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => emailPwdInputHandleChange(text, "pwd")}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        editable={emailPwdEnable}
        style={emailPwdEnable ? styles.editable : styles.notEditable}
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  editable: {
    backgroundColor: "#fff",
  },
  notEditable: {
    backgroundColor: "#e7e7e7",
  },
});

export default memo(LoginScreen);
