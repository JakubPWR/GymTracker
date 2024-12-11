import React, { useEffect, useState, useContext } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import SwipeGesture from "@/components/ui/SwipeGesture";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DateContext, DateContextProvider } from "@/contexts/dateContext";
import Example from "@/components/ui/test";
export default function MainPage() {
  const { startDate, setStartDate, weekDays, goNextWeek, getWeekDays } =
    useContext(DateContext);
  return (
    <>
      <GestureHandlerRootView>
        <View style={styles.globalView}>
          <View style={styles.weekDaysBar}>
            <Text style={styles.titleText}>Gym Tracker</Text>
            <SwipeGesture />
          </View>
          <View style={styles.excercisesRow}></View>
          <View style={styles.navbar}>
            <TouchableOpacity
              onPress={() => setStartDate(goNextWeek(startDate))}
            >
              <Text>Next Week</Text>
            </TouchableOpacity>
          </View>
        </View>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  titleText: {
    backgroundColor: "#fc035a",
    padding: 5,
    width: "50%",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  globalView: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a64d79",
  },
  weekDaysBar: {
    flex: 2.5,
    display: "flex",
    flexDirection: "column",

    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#6a1e55",
  },
  dateButton: {
    display: "flex",
    flexDirection: "column",
    width: 50,
    height: 50,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderColor: "black",
    color: "black",
    fontWeight: "bold",
  },
  navbar: {
    width: "100%",
    flex: 2,
    backgroundColor: "#1a1a1d",
    alignItems: "center",
    justifyContent: "center",
  },
  excercisesRow: {
    flex: 13,
    width: "100%",
  },
  safeArea: {
    backgroundColor: "#6a1e55",
  },
  statusBar: {
    backgroundColor: "#1a1a1d",
  },
});
