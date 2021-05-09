import React, { useEffect, useState } from "react";
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Focus } from "./src/features/Focus";
import FocusHistory from "./src/features/FocusHistory";
import { Timer } from "./src/features/Timer";
import { colors } from "./src/utils/colors";

const STATUS = {
  complete: 1,
  failure: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState();
  const [focusSubjectsHistory, setFocusSubjectsHistory] = useState([]);

  const addFocusHistoryWithStatus = (subject, status) => {
    setFocusSubjectsHistory([
      ...focusSubjectsHistory,
      { subject, status, key: String(Math.random() * 1000) },
    ]);
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(
        "focusHistory",
        JSON.stringify(focusSubjectsHistory)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const result = await AsyncStorage.getItem("focusHistory");
      if (result && JSON.parse(result).length) {
        setFocusSubjectsHistory(JSON.parse(result));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    saveData();
  }, [focusSubjectsHistory]);

  useEffect(() => {
    getData();
  }, []);

  const onClear = () => {
    setFocusSubjectsHistory([]);
  };

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusItem={focusSubject}
          onClearSubject={() => {
            addFocusHistoryWithStatus(focusSubject, STATUS.failure);
            setFocusSubject(null);
          }}
          onFocusEnd={() => {
            addFocusHistoryWithStatus(focusSubject, STATUS.complete);
            setFocusSubject(null);
          }}
        />
      ) : (
        <>
          <Focus onChangeValue={setFocusSubject} />
          <FocusHistory
            focusSubjects={focusSubjectsHistory}
            onClear={onClear}
          />
        </>
      )}
      {/* <Text>{focusSubject}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingTop: Platform.OS === "ios" ? 35 : StatusBar.currentHeight,
  },
});
