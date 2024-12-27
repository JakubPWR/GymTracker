import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const onLogin = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/(tabs)/(MainPage)/Excercises");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text>
          {password},{email}
        </Text>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text>Press To Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/(MainPage)/Excercises")}
        >
          <Text>Press To MainPage</Text>
        </TouchableOpacity>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Type in your credentials</Text>
          <TextInput
            style={styles.input}
            spellCheck={false}
            placeholder="email@email.com"
            placeholderTextColor="black"
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            spellCheck={false}
            placeholder="password123"
            placeholderTextColor="black"
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
          <TouchableOpacity onPress={() => onLogin} style={styles.button}>
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/(Auth)/register")}
            style={styles.button}
          >
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
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

export default Register;
