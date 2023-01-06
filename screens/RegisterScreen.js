import React, { memo, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import InputDropDown from "../components/DropDown";
import { theme } from "../core/theme";
// import { Navigation } from "../types";
// import {
//   emailValidator,
//   passwordValidator,
//   nameValidator,
// } from "../core/utils";

const RegisterScreen = ({ navigation, urlData }) => {
  console.log(urlData);
  const [param, setParam] = useState(null);
  const [firstName, setFirstName] = useState({ value: "", error: "" });
  const [lastName, setLastName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [retypePassword, setRetypePassword] = useState({
    value: "",
    error: "",
  });
  const [gender, setGender] = useState({ value: "male", error: "" });
  const [experience, setExperience] = useState({ value: "", error: "" });
  const [phoneNo, setPhoneNo] = useState({ value: "", error: "" });
  const [addressLine1, setAddressLine1] = useState({ value: "", error: "" });
  const [addressLine2, setAddressLine2] = useState({ value: "", error: "" });
  const [pinCode, setPinCode] = useState({ value: "", error: "" });
  const [state, setState] = useState({ value: "", error: "" });
  const [city, setCity] = useState({ value: "", error: "" });
  const [country, setCountry] = useState({ value: "", error: "" });

  const genderList = require("../data/gender.json");
  const stateList = require("../data/state.json");

  const _onSignUpPressed = () => {
    const firstNameError = firstName.value; //nameValidator(firstName.value);
    const lastNameError = lastName.value; //nameValidator(lastName.value);

    const emailError = email.value; //emailValidator(email.value);
    const passwordError = password.value; //passwordValidator(password.value);
    if (emailError || passwordError || firstNameError || lastNameError) {
      setFirstName({ ...firstName, error: firstNameError });
      setLastName({ ...firstName, error: lastNameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    navigation.navigate("Dashboard");
  };

  useEffect(() => {
    console.log(urlData);
    if (
      urlData &&
      urlData.queryParams &&
      JSON.stringify(urlData.queryParams) !== JSON.stringify({})
    ) {
      setParam(urlData.queryParams);
    }
  }, [urlData]);

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("LoginScreen")} />
      <Header>
        {param && param.userType === "consultant" ? (
          <Text>Consultant </Text>
        ) : (
          <Text>User </Text>
        )}
        Signup
      </Header>
      <ScrollView
        style={styles.scrollView}
        automaticallyAdjustContentInsets={false}
      >
        <View style={styles.scrollInnerView}>
          <TextInput
            label="First Name"
            returnKeyType="next"
            value={firstName.value}
            onChangeText={(text) => setFirstName({ value: text, error: "" })}
            error={!!firstName.error}
            errorText={firstName.error}
          />
          <TextInput
            label="Last Name"
            returnKeyType="next"
            value={lastName.value}
            onChangeText={(text) => setLastName({ value: text, error: "" })}
            error={!!lastName.error}
            errorText={lastName.error}
          />
          <TextInput
            label="Email"
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: "" })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <TextInput
            label="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: "" })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />
          <TextInput
            label="Retype Password"
            returnKeyType="done"
            value={retypePassword.value}
            onChangeText={(text) =>
              setRetypePassword({ value: text, error: "" })
            }
            error={!!retypePassword.error}
            errorText={retypePassword.error}
            secureTextEntry
          />

          <InputDropDown
            label={"Gender"}
            selectionColor={theme.colors.primary}
            value={gender.value}
            setValue={(text) => setGender({ value: text, error: "" })}
            list={genderList}
          />

          <TextInput
            label="Experience"
            returnKeyType="next"
            value={experience.value}
            onChangeText={(text) => setExperience({ value: text, error: "" })}
            error={!!experience.error}
            errorText={experience.error}
            keyboardType="number-pad"
          />

          <TextInput
            label="Phone No."
            returnKeyType="next"
            value={phoneNo.value}
            onChangeText={(text) => setPhoneNo({ value: text, error: "" })}
            error={!!phoneNo.error}
            errorText={phoneNo.error}
            keyboardType="number-pad"
          />
          <TextInput
            label="Address Line 1"
            returnKeyType="next"
            value={addressLine1.value}
            onChangeText={(text) => setAddressLine1({ value: text, error: "" })}
            error={!!addressLine1.error}
            errorText={addressLine1.error}
          />
          <TextInput
            label="Address Line 2"
            returnKeyType="next"
            value={addressLine1.value}
            onChangeText={(text) => setAddressLine2({ value: text, error: "" })}
            error={!!addressLine2.error}
            errorText={addressLine2.error}
          />
          <TextInput
            label="Pin Code"
            returnKeyType="next"
            value={pinCode.value}
            onChangeText={(text) => setPinCode({ value: text, error: "" })}
            error={!!pinCode.error}
            errorText={pinCode.error}
            keyboardType="number-pad"
          />
          <InputDropDown
            label={"State"}
            selectionColor={theme.colors.primary}
            value={state.value}
            setValue={(text) => setState({ value: text, error: "" })}
            list={stateList}
          />

          <TextInput
            label="City"
            returnKeyType="next"
            value={city.value}
            onChangeText={(text) => setCity({ value: text, error: "" })}
            error={!!city.error}
            errorText={city.error}
          />
          <TextInput
            label="Country"
            returnKeyType="next"
            value={country.value}
            onChangeText={(text) => setCountry({ value: text, error: "" })}
            error={!!country.error}
            errorText={country.error}
          />

          <Button
            mode="contained"
            onPress={_onSignUpPressed}
            style={styles.button}
          >
            Sign Up
          </Button>
          <View style={styles.row}>
            <Text style={styles.label}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
    marginBottom: 10,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  scrollView: {
    alignSelf: "stretch",
  },
  scrollInnerView: {
    flexShrink: 0,
    flexGrow: 1,
  },
});

export default memo(RegisterScreen);
