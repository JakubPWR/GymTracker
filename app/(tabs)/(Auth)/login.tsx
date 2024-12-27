import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { AuthContext } from "@/contexts/authContext";

const Login = () => {
  const { email, setEmail, password, setPassword, logged, setLogged } =
    useContext(AuthContext);
  const auth = FIREBASE_AUTH;

  const onLogin = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLogged(true);
        router.push("/(tabs)/(MainPage)/Excercises");
      })
      .catch((error) => {
        console.error("Login error:", error.code, error.message);
      });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/(tabs)/(Auth)/login");
      })
      .catch((error) => {
        console.error("Registration error:", error.code, error.message);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/(tabs)/(MainPage)/Excercises");
      }
    });
    return () => unsubscribe();
  }, [auth]);

  if (!auth) {
    return <Text>Waiting for connection</Text>;
  } else {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>Type in your credentials</Text>
            <TextInput
              style={styles.input}
              spellCheck={false}
              placeholder="email@email.com"
              placeholderTextColor="black"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              spellCheck={false}
              placeholder="password123"
              placeholderTextColor="black"
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity onPress={(e) => onLogin(e)} style={styles.button}>
              <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={(e) => onSubmit(e)}
              style={styles.button}
            >
              <Text>Register</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3B1C32",
  },
  input: {
    borderRadius: 10,
    borderWidth: 5,
    padding: 10,
    margin: 5,
    minWidth: "60%",
    backgroundColor: "white",
    borderColor: "black",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 2,
    padding: 10,
    margin: 5,
    backgroundColor: "#6A1E55",
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 2,
    padding: 10,
    margin: 5,
    backgroundColor: "#A64D79",
    minWidth: "90%",
    minHeight: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default Login;
