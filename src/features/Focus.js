import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { RoundedButton } from "../components/RoundedButton";
import { spacing } from "../utils/sizes";

export function Focus({ onChangeValue }) {
  const [subjectValue, setSubjectValue] = useState();
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What Would U Like To Focus On?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(val) => setSubjectValue(val)}
            style={styles.textInput}
          />
          <RoundedButton
            title="+"
            size={50}
            onPress={() => onChangeValue(subjectValue)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.md,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.sm,
  },
  title: {
    fontSize: spacing.lg,
    color: "#fff",
    fontWeight: "bold",
    marginVertical: spacing.sm,
  },
  textInput: {
    flex: 1,
    marginRight: spacing.md,
  },
});
