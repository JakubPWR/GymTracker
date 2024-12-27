import { AuthContextProvider } from "@/contexts/authContext";
import { DateContextProvider } from "@/contexts/dateContext";
import { ExcerciseContextProvider } from "@/contexts/excerciseContext";
import { Stack } from "expo-router/stack";
import { TouchableOpacity, Text } from "react-native";

export default function Layout() {
  return (
    <AuthContextProvider>
      <DateContextProvider>
        <ExcerciseContextProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              headerStyle: { backgroundColor: "#910f41" },
            }}
          >
            <Stack.Screen
              name="(tabs)"
              options={{ headerTitle: "Home Page" }}
            />
          </Stack>
        </ExcerciseContextProvider>
      </DateContextProvider>
    </AuthContextProvider>
  );
}
