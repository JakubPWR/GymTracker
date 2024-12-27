import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { ExcerciseContext } from "@/contexts/excerciseContext";
import { DateContext } from "@/contexts/dateContext";
import { db, FIREBASE_AUTH } from "@/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const AddNewExcercise = () => {
  const { setExcercises, selectedCategory } = useContext(ExcerciseContext);
  const { chosenDate } = useContext(DateContext);
  const auth = FIREBASE_AUTH;

  const [name, setName] = useState("");
  const [weight, setWeight] = useState<number | string>("");
  const [reps, setReps] = useState<number | string>("");
  const [sets, setSets] = useState<number | string>("");

  const handleSubmit = async () => {
    // Validate input
    if (!name || !weight || !reps || !sets) {
      alert("Please fill in all fields!");
      return;
    }
    const user = auth.currentUser;
    const id = user?.uid;
    try {
      const docRef = await addDoc(collection(db, "Exercises"), {
        category: selectedCategory,
        name,
        weight: parseFloat(weight as string),
        reps: parseInt(reps as string, 10),
        sets: parseInt(sets as string, 10),
        date: chosenDate,
        userId: `${id}`,
      });
      console.log("Document written with ID: ", docRef.id);
      setExcercises((prev) => [
        ...prev,
        {
          id: `${docRef.id}`,
          category: selectedCategory,
          name,
          weight: parseFloat(weight as string),
          reps: parseInt(reps as string, 10),
          sets: parseInt(sets as string, 10),
          date: chosenDate,
          userId: `${id}`,
        },
      ]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // Add the new exercise

    // Clear inputs
    setName("");
    setWeight("");
    setReps("");
    setSets("");
    alert("Exercise added successfully!");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Add new {selectedCategory} Exercise</Text>
          <TextInput
            style={styles.input}
            placeholder="Exercise Name"
            placeholderTextColor="black"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Weight (kg)"
            placeholderTextColor="black"
            value={weight.toString()}
            keyboardType="numeric"
            onChangeText={setWeight}
          />
          <TextInput
            style={styles.input}
            placeholder="Reps"
            placeholderTextColor="black"
            value={reps.toString()}
            keyboardType="numeric"
            onChangeText={setReps}
          />
          <TextInput
            style={styles.input}
            placeholder="Sets"
            placeholderTextColor="black"
            value={sets.toString()}
            keyboardType="numeric"
            onChangeText={setSets}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Add Exercise</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3B1C32",
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
    minHeight: "70%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    margin: 10,
    minWidth: "80%",
    backgroundColor: "white",
    borderColor: "gray",
    color: "black",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 2,
    padding: 10,
    marginTop: 20,
    backgroundColor: "#6A1E55",
    minWidth: "50%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AddNewExcercise;
