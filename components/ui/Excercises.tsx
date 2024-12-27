import { ExcerciseContext } from "@/contexts/excerciseContext";
import { DateContext } from "@/contexts/dateContext";
import { router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db, FIREBASE_AUTH } from "@/FirebaseConfig";
import { Excercise } from "@/contexts/excerciseContext";

const Excercises = () => {
  const { excercises, setExcercises, selectedCategory, setSelectedCategory } =
    useContext(ExcerciseContext);
  const { chosenDate, setChosenDate } = useContext(DateContext);
  const exercisesCollectionRef = collection(db, "Exercises");
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser;
  const getExercisesList = async () => {
    if (user) {
      const userId = user.uid;
      try {
        const data = await getDocs(exercisesCollectionRef);
        const filteredData = data.docs
          .map(
            (doc) =>
              ({
                ...doc.data(),
                id: doc.id,
              }) as Excercise
          )
          .filter((excercise) => {
            return (
              excercise.userId == userId &&
              excercise.date.toDate().getFullYear() ===
                chosenDate.getFullYear() &&
              excercise.date.toDate().getMonth() === chosenDate.getMonth() &&
              excercise.date.toDate().getDate() === chosenDate.getDate()
            );
          });
        const filteredData2 = filteredData.map((element) => ({
          ...(element as Excercise),
          date: element.date.toDate(),
        }));
        console.log(filteredData2);
        setExcercises(filteredData2);
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    getExercisesList();
  }, [chosenDate]);
  const addNewExcercise = (category: string, date: Date) => {
    setSelectedCategory(category);
    setChosenDate(chosenDate);
    router.replace("/(tabs)/(Excercises)/AddNewExcercise");
  };
  console.log(excercises);
  return (
    <View style={styles.container}>
      <View style={styles.headersContainer}>
        <Text style={styles.nameHeader}>Name</Text>
        <Text style={styles.propHeader}>Weight</Text>
        <Text style={styles.propHeader}>Reps</Text>
        <Text style={styles.propHeader}>Sets</Text>
        <Text style={styles.propHeader}></Text>
      </View>
      <View style={styles.categoryBox}>
        <View style={styles.categoryTopField}>
          <Text style={styles.categoryTitle}>Chest</Text>
          <TouchableOpacity
            onPress={() => addNewExcercise("Chest", chosenDate)}
            style={styles.categoryButton}
          >
            <Text style={styles.categoryButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {excercises
          .filter((excercise) => {
            return (
              excercise.category === "Chest" &&
              excercise.date.getFullYear() === chosenDate.getFullYear() &&
              excercise.date.getMonth() === chosenDate.getMonth() &&
              excercise.date.getDate() === chosenDate.getDate()
            );
          })
          .map((excercises, index) => (
            <>
              <View key={`${excercises.id}`} style={styles.categoryContainer}>
                <Text style={styles.excerciseName}>{excercises.name}</Text>
                <Text style={styles.excerciseProp}>{excercises.weight}</Text>
                <Text style={styles.excerciseProp}>{excercises.reps}</Text>
                <Text style={styles.excerciseProp}>{excercises.sets}</Text>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.excerciseProp}>Edit</Text>
                </TouchableOpacity>
              </View>
            </>
          ))}
      </View>
      <View style={styles.categoryBox}>
        <View style={styles.categoryTopField}>
          <Text style={styles.categoryTitle}>Back</Text>
          <TouchableOpacity
            onPress={() => addNewExcercise("Back", chosenDate)}
            style={styles.categoryButton}
          >
            <Text style={styles.categoryButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {excercises
          .filter((excercise) => {
            return (
              excercise.category === "Back" &&
              excercise.date.getFullYear() === chosenDate.getFullYear() &&
              excercise.date.getMonth() === chosenDate.getMonth() &&
              excercise.date.getDate() === chosenDate.getDate()
            );
          })
          .map((excercises, index) => (
            <>
              <View key={`${excercises.id}`} style={styles.categoryContainer}>
                <Text style={styles.excerciseName}>{excercises.name}</Text>
                <Text style={styles.excerciseProp}>{excercises.weight}</Text>
                <Text style={styles.excerciseProp}>{excercises.reps}</Text>
                <Text style={styles.excerciseProp}>{excercises.sets}</Text>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.excerciseProp}>Edit</Text>
                </TouchableOpacity>
              </View>
            </>
          ))}
      </View>
      <View style={styles.categoryBox}>
        <View style={styles.categoryTopField}>
          <Text style={styles.categoryTitle}>Legs</Text>
          <TouchableOpacity
            onPress={() => addNewExcercise("Legs", chosenDate)}
            style={styles.categoryButton}
          >
            <Text style={styles.categoryButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {excercises
          .filter((excercise) => {
            return (
              excercise.category === "Legs" &&
              excercise.date.getFullYear() === chosenDate.getFullYear() &&
              excercise.date.getMonth() === chosenDate.getMonth() &&
              excercise.date.getDate() === chosenDate.getDate()
            );
          })
          .map((excercises, index) => (
            <>
              <View key={`${excercises.id}`} style={styles.categoryContainer}>
                <Text style={styles.excerciseName}>{excercises.name}</Text>
                <Text style={styles.excerciseProp}>{excercises.weight}</Text>
                <Text style={styles.excerciseProp}>{excercises.reps}</Text>
                <Text style={styles.excerciseProp}>{excercises.sets}</Text>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.excerciseProp}>Edit</Text>
                </TouchableOpacity>
              </View>
            </>
          ))}
      </View>
      <View style={styles.categoryBox}>
        <View style={styles.categoryTopField}>
          <Text style={styles.categoryTitle}>Arms</Text>
          <TouchableOpacity
            onPress={() => addNewExcercise("Arms", chosenDate)}
            style={styles.categoryButton}
          >
            <Text style={styles.categoryButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {excercises
          .filter((excercise) => {
            return (
              excercise.category === "Arms" &&
              excercise.date.getFullYear() === chosenDate.getFullYear() &&
              excercise.date.getMonth() === chosenDate.getMonth() &&
              excercise.date.getDate() === chosenDate.getDate()
            );
          })
          .map((excercises, index) => (
            <>
              <View key={`${excercises.id}`} style={styles.categoryContainer}>
                <Text style={styles.excerciseName}>{excercises.name}</Text>
                <Text style={styles.excerciseProp}>{excercises.weight}</Text>
                <Text style={styles.excerciseProp}>{excercises.reps}</Text>
                <Text style={styles.excerciseProp}>{excercises.sets}</Text>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.excerciseProp}>Edit</Text>
                </TouchableOpacity>
              </View>
            </>
          ))}
      </View>
      <View style={styles.categoryBox}>
        <View style={styles.categoryTopField}>
          <Text style={styles.categoryTitle}>Core</Text>
          <TouchableOpacity
            onPress={() => addNewExcercise("Core", chosenDate)}
            style={styles.categoryButton}
          >
            <Text style={styles.categoryButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {excercises
          .filter((excercise) => {
            return (
              excercise.category === "Core" &&
              excercise.date.getFullYear() === chosenDate.getFullYear() &&
              excercise.date.getMonth() === chosenDate.getMonth() &&
              excercise.date.getDate() === chosenDate.getDate()
            );
          })
          .map((excercises, index) => (
            <>
              <View key={`${excercises.id}`} style={styles.categoryContainer}>
                <Text style={styles.excerciseName}>{excercises.name}</Text>
                <Text style={styles.excerciseProp}>{excercises.weight}</Text>
                <Text style={styles.excerciseProp}>{excercises.reps}</Text>
                <Text style={styles.excerciseProp}>{excercises.sets}</Text>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.excerciseProp}>Edit</Text>
                </TouchableOpacity>
              </View>
            </>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
  },
  headersContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  nameHeader: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 2,
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
  },
  propHeader: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
  },
  excercisesContainer: {
    marginTop: 10,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    marginLeft: 5,
    marginRight: 5,
  },
  excerciseName: {
    fontSize: 16,
    flex: 2,
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    fontWeight: "bold",
  },
  excerciseProp: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
  },
  editButton: {
    flex: 1,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#910f41",
    marginRight: 5,
  },
  editButtonText: {
    fontSize: 25,
    flex: 5,
    fontWeight: "bold",
  },
  categoryBox: {
    display: "flex",
    width: "99%",
    justifyContent: "flex-start",
    flexDirection: "column",
    borderColor: "black",
    borderWidth: 2,
    marginBottom: 10,
  },
  categoryContainer: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    marginBottom: 5,
  },
  categoryElement: {},
  categoryTopField: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 10,
  },
  categoryTitle: {
    fontSize: 25,
    flex: 5,
    fontWeight: "bold",
    marginLeft: 10,
  },
  categoryButtonText: {
    fontSize: 25,
    flex: 5,
    fontWeight: "bold",
  },
  categoryButton: {
    flex: 1,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#910f41",
    marginRight: 5,
  },
});

export default Excercises;
