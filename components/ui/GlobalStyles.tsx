import styled from "styled-components/native";
import { Text, View, SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const GlobalSafeAreaView = styled(SafeAreaView)`
  flex: 0;
  background-color: #a64d79;
`;

export const GlobalView = styled.View`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #a64d79;
`;

export const WeekDaysBar = styled.View`
  flex: 2;
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  background-color: #6a1e55;
`;

export const Excercises = styled.ScrollView`
  flex: 13;
  width: 100%;
`;
