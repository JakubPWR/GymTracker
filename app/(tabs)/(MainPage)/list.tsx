import React, { useContext, useEffect } from "react";
import { Touchable, TouchableOpacity } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { db, FIREBASE_AUTH } from "@/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { AuthContext } from "@/contexts/authContext";
import { DateContext } from "@/contexts/dateContext";
import { router } from "expo-router";

const List = () => {
  const { email, setEmail, password, setPassword, logged, setLogged } =
    useContext(AuthContext);
  const { chosenDate } = useContext(DateContext);
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser;
  const userId = user?.uid;
  useEffect(() => {
    if (!logged) {
      router.replace("/(tabs)/(Auth)/login");
    }
    return () => {};
  }, [logged]);
  const onLogOut = () => {
    auth
      .signOut()
      .then(() => {
        setLogged(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View>
      <Text>List</Text>
      <TouchableOpacity onPress={() => onLogOut()}>
        <Text>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default List;
