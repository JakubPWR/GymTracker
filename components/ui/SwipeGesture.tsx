import { DateContext } from "@/contexts/dateContext";
import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

const SwipeGesture = () => {
  const { startDate, setStartDate, weekDays, goNextWeek, goPreviousWeek } =
    useContext(DateContext);

  const LeftSwipeActions = () => {
    return (
      <View style={styles.swipeData}>
        {weekDays.map((day, index) => (
          <TouchableOpacity style={styles.dateButton} key={index}>
            <Text>{day.date}</Text>
            <Text>{day.day}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const RightSwipeActions = () => {
    return (
      <View style={styles.swipeData}>
        {weekDays.map((day, index) => (
          <TouchableOpacity style={styles.dateButton} key={index}>
            <Text>{day.date}</Text>
            <Text>{day.day}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <Swipeable
      renderLeftActions={LeftSwipeActions}
      renderRightActions={RightSwipeActions}
      onSwipeableLeftOpen={() => {
        setStartDate(goPreviousWeek(startDate));
      }}
      onSwipeableRightOpen={() => {
        setStartDate(goNextWeek(startDate));
      }}
    >
      <View style={styles.swipeData}>
        {weekDays.map((day, index) => (
          <TouchableOpacity style={styles.dateButton} key={index}>
            <Text>{day.date}</Text>
            <Text>{day.day}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  globalView: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a64d79",
  },
  swipeData: {
    flex: 0.9,
    display: "flex",
    flexDirection: "row",
    gap: "5px",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "80%",
    backgroundColor: "#6a1e55",
  },
  dateButton: {
    display: "flex",
    flexDirection: "column",
    width: 50,
    height: 50,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderColor: "black",
    color: "black",
    fontWeight: "bold",
  },
});

export default SwipeGesture;
