import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RoundedButton } from "../components/RoundedButton";
import { spacing } from "../utils/sizes";

export default function Timing({ onChangeTime }) {
  return (
    <View style={styles.container}>
      <RoundedButton title="5" size={75} onPress={() => onChangeTime(5)} />
      <RoundedButton title="10" size={75} onPress={() => onChangeTime(10)} />
      <RoundedButton title="15" size={75} onPress={() => onChangeTime(15)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: spacing.md,
    // backgroundColor: "red",
  },
});
