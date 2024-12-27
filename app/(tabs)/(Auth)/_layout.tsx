import { Stack } from "expo-router/stack";
import { Tabs } from "expo-router";
import { TouchableOpacity, Text } from "react-native";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerStyle: { backgroundColor: "#910f41" },
          headerTitleStyle: { fontWeight: "bold" },
        }}
      ></Stack.Screen>
      <Stack.Screen name="register"></Stack.Screen>
    </Stack>
  );
}
