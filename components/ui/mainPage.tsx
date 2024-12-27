import React, { useEffect, useState, useContext } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import SwipeGesture from "@/components/ui/SwipeGesture";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { DateContext, DateContextProvider } from "@/contexts/dateContext";
import Example from "@/components/ui/test";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Excercises from "./Excercises";
export default function MainPage() {
  const { startDate, setStartDate, weekDays, goNextWeek, getWeekDays } =
    useContext(DateContext);
  return (
    <>
      <GestureHandlerRootView>
        <View style={styles.globalView}>
          <View style={styles.weekDaysBar}>
            <SwipeGesture />
          </View>
          <ScrollView
            style={styles.excercisesRow}
            contentContainerStyle={styles.excercisesContainerRow}
          >
            <Excercises />
          </ScrollView>
          <View style={styles.navbar}></View>
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
    flex: 1,
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
    flexGrow: 13,
    width: "100%",
  },
  excercisesContainerRow: {
    flex: 1,
  },
  safeArea: {
    backgroundColor: "#6a1e55",
  },
  statusBar: {
    backgroundColor: "#1a1a1d",
  },
});
