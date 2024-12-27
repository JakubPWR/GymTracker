import { Stack } from "expo-router/stack";
import { Tabs } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import SwipeGesture from "@/components/ui/SwipeGesture";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { DateContext, DateContextProvider } from "@/contexts/dateContext";
import { ExcerciseContextProvider } from "@/contexts/excerciseContext";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: () => <Text style={styles.titleText}>Gym Tracker</Text>,
        headerStyle: {
          backgroundColor: "#1a1a1d",
        },
        tabBarStyle: {
          backgroundColor: "#6a1e55",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#fc035a", // Color of active tab icon/text
        tabBarInactiveTintColor: "black", // Color of inactive tab icon/text
        tabBarItemStyle: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center", // Center content
          borderRadius: 20, // Rounded tab buttons
          margin: 5, // Spacing between tabs
          backgroundColor: "#4a1440", // Background for individual tabs
          height: 60, // Ensures a consistent height for tabs
        },
        tabBarLabelStyle: {
          fontSize: 14, // Enhanced font size for better visibility
          fontWeight: "bold", // Optional: makes the text bold
          paddingTop: 6, // Adjust space between icon and label
        },
      }}
    >
      <Tabs.Screen name="Excercises"></Tabs.Screen>
      <Tabs.Screen name="list"></Tabs.Screen>
    </Tabs>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    width: "90%",
    borderRadius: 15,
    backgroundColor: "#1a1a1d",
  },
  titleText: {
    backgroundColor: "#fc035a",
    padding: 5,
    width: "100%",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
    borderRadius: 20,
  },
});
