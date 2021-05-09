import React, { useState } from "react";
import { StyleSheet, Text, View, Vibration } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useKeepAwake } from "expo-keep-awake";

import { CountDown } from "../components/CountDown";
import { RoundedButton } from "../components/RoundedButton";
import { colors } from "../utils/colors";
import { spacing } from "../utils/sizes";
import Timing from "./Timing";

export function Timer({ focusItem, onClearSubject, onFocusEnd }) {
  useKeepAwake();

  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(1);

  const onVibrate = () => {
    Vibration.vibrate(4000);
  };

  const onEnd = () => {
    onVibrate();
    setIsStarted(false);
    setProgress(1);
    setMinutes(0.5);
    onFocusEnd();
  };

  const changeTime = (min) => {
    setMinutes(min);
    console.log(min);
    setProgress(1);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countDown}>
        <CountDown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onTimerEnd={onEnd}
        />
      </View>
      <View style={styles.focusingOn}>
        <Text style={styles.title}>We're Focusing On:</Text>
        <Text style={styles.subject}>{focusItem}</Text>
      </View>
      <ProgressBar
        color={colors.lightBlue}
        progress={progress}
        style={{ height: 10, marginVertical: 10 }}
      />
      <Timing onChangeTime={changeTime} />
      <View style={styles.btnWrapper}>
        {isStarted ? (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearBtn}>
        <RoundedButton title="-" size={75} onPress={() => onClearSubject()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnWrapper: {
    flex: 0.3,
    flexDirection: "row",
    // backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
    paddingTop: 30,
  },
  container: {
    flex: 1,
  },
  clearBtn: {
    padding: spacing.md,
  },
  countDown: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  focusingOn: {
    alignItems: "center",
  },
  subject: {
    color: colors.white,
    fontSize: spacing.lg,
  },
  title: {
    color: colors.white,
    fontSize: spacing.lg,
    fontWeight: "bold",
  },
});
