import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../utils/colors";
import { spacing } from "../utils/sizes";

const minutesToMillis = (min) => min * 1000 * 60;

// func to format the time properly. (if the time is < 2 digits)
//  we return the time and 0 before it.
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export function CountDown({ isPaused, minutes, onProgress, onTimerEnd }) {
  const [millis, setMillis] = useState(minutesToMillis(minutes));
  const interval = useRef();

  const min = Math.floor(millis / 1000 / 60) % 60;
  const sec = Math.floor(millis / 1000) % 60;

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        return 0;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
    if (millis === 0) {
      onTimerEnd();
      clearInterval(interval.current);
    }
  }, [millis]);

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{`${formatTime(min)}:${formatTime(
        sec
      )}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.lightBlue,
    alignItems: "center",
    // marginTop: spacing.xl,
  },

  timeText: {
    color: colors.white,
    fontSize: spacing.xxxl,
  },
});
