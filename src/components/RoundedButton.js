import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function RoundedButton({ size = 125, onPress, ...props }) {
  return (
    <TouchableOpacity style={styles(size).container} onPress={onPress}>
      <Text style={styles(size).title}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = (size) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      borderColor: "#fff",
      borderWidth: 2,
      borderRadius: size / 2,
      height: size,
      width: size,
      justifyContent: "center",
    },
    title: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: size / 3,
    },
  });
