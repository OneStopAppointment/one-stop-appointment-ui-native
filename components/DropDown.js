import React, { memo, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import DropDown from "react-native-paper-dropdown";
import { theme } from "../core/theme";

const InputDropDown = ({ errorText, ...props }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <View style={styles.container}>
      <DropDown
        mode={"outlined"}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        {...props}
      />
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  input: {
    backgroundColor: "#fff",
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(InputDropDown);
