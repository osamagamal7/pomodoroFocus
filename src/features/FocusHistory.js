import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { RoundedButton } from "../components/RoundedButton";
import { colors } from "../utils/colors";
import { fontSizes, spacing } from "../utils/sizes";

export default function FocusHistory({ focusSubjects, onClear }) {
  const focusItem = ({ item }) => {
    return <Text style={styles.focusItem(item.status)}>{item.subject}</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      {!!focusSubjects.length && (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.label}>Things We've Focused On:</Text>
          <FlatList
            style={{ flex: 1 }}
            data={focusSubjects}
            renderItem={focusItem}
            contentContainerStyle={{
              alignItems: "center",
            }}
          />
          <View style={styles.clear}>
            <RoundedButton title="Clear" size={100} onPress={onClear} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: "center",
  },
  clear: {
    padding: spacing.md,
  },
  focusItem: (status) => ({
    color: status > 1 ? "red" : "green",
    fontSize: fontSizes.lg,
  }),
  label: {
    color: colors.white,
    fontSize: fontSizes.lg,
    fontWeight: "bold",
    marginVertical: 20,
  },
});
