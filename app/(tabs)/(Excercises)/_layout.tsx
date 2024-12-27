import { router, Stack } from "expo-router";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ExcerciseContext } from "@/contexts/excerciseContext";

const Layout = () => {
  const { selectedCategory } = useContext(ExcerciseContext);

  return (
    <Stack>
      <Stack.Screen
        name="AddNewExcercise"
        options={{
          headerStyle: { backgroundColor: "#910f41" },
          headerTitleStyle: { fontWeight: "bold", fontSize: 30 },
          headerTitle: `${selectedCategory}`, // Dynamic title
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.replace("/(tabs)/(MainPage)/Excercises")}
              style={{ paddingLeft: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color="#fc035a" />
            </TouchableOpacity>
          ),
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default Layout;
