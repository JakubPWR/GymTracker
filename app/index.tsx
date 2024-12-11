import React, { useEffect, useState, useContext } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import SwipeGesture from "@/components/ui/SwipeGesture";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { DateContext, DateContextProvider } from "@/contexts/dateContext";
import MainPage from "./mainPage";
export default function Page() {
  return (
    <DateContextProvider>
      <MainPage />
    </DateContextProvider>
  );
}
