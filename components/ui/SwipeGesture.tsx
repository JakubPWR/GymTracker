import { DateContext } from "@/contexts/dateContext";
import React, { useContext, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

const SwipeGesture = () => {
  const {
    startDate,
    setStartDate,
    weekDays,
    goNextWeek,
    goPreviousWeek,
    chosenDate,
    setChosenDate,
  } = useContext(DateContext);
  let DateDict: Record<number, string> = {
    0: "N",
    1: "Pn",
    2: "Wt",
    3: "Śr",
    4: "Cz",
    5: "Pt",
    6: "S",
  };
  let MonthDict: Record<number, string> = {
    0: "Sty",
    1: "Lut",
    2: "Mar",
    3: "Kwi",
    4: "Maj",
    5: "Cze",
    6: "Lip",
    7: "Sie",
    8: "Wrz",
    9: "Paź",
    10: "Lis",
    11: "Gru",
  };

  // Explicitly typing the ref for Swipeable
  const swipeableRef = useRef<Swipeable>(null);

  const LeftSwipeActions = () => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() - 7);
    const monthYear = `${MonthDict[date.getMonth()]} ${date.getFullYear()}`;
    return (
      <View style={styles.swipeData}>
        <Text>{monthYear}</Text>
      </View>
    );
  };

  const RightSwipeActions = () => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + 7);
    const monthYear = `${MonthDict[date.getMonth()]} ${date.getFullYear()}`;
    return (
      <View style={styles.swipeData}>
        <Text>{monthYear}</Text>
      </View>
    );
  };

  const handleLeftSwipe = () => {
    setStartDate(goPreviousWeek(startDate));
    if (swipeableRef.current) {
      swipeableRef.current.reset(); // Close the swipeable after action
    }
  };

  const handleRightSwipe = () => {
    setStartDate(goNextWeek(startDate));
    if (swipeableRef.current) {
      swipeableRef.current.reset(); // Close the swipeable after action
    }
  };
  const chosenDateDay = DateDict[chosenDate.getDay()];
  const startDateDay = DateDict[new Date().getDay()];
  return (
    <Swipeable
      ref={swipeableRef}
      renderLeftActions={LeftSwipeActions}
      renderRightActions={RightSwipeActions}
      onSwipeableLeftOpen={handleLeftSwipe}
      onSwipeableRightOpen={handleRightSwipe}
      friction={2} // Adjust friction to control sensitivity
      leftThreshold={50}
      rightThreshold={50}
    >
      <View style={styles.swipeData}>
        {weekDays.map((day, index) => {
          if (
            day.getDate() === chosenDate.getDate() &&
            DateDict[day.getDay()] === chosenDateDay
          ) {
            return (
              <TouchableOpacity
                onPress={() => {
                  setChosenDate(day);
                }}
                style={styles.chosenButton}
                key={index}
              >
                <Text>{day.getDate()}</Text>
                <Text>{DateDict[day.getDay()]}</Text>
              </TouchableOpacity>
            );
          } else if (
            day.getDate() === new Date().getDate() &&
            DateDict[day.getDay()] === startDateDay
          ) {
            return (
              <TouchableOpacity
                onPress={() => {
                  setChosenDate(day);
                }}
                style={styles.todayButton}
                key={index}
              >
                <Text>{day.getDate()}</Text>
                <Text>{DateDict[day.getDay()]}</Text>
              </TouchableOpacity>
            );
          } else
            return (
              <TouchableOpacity
                onPress={() => {
                  setChosenDate(day);
                }}
                style={styles.dateButton}
                key={index}
              >
                <Text>{day.getDate()}</Text>
                <Text>{DateDict[day.getDay()]}</Text>
              </TouchableOpacity>
            );
        })}
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
  todayButton: {
    display: "flex",
    flexDirection: "column",
    width: 50,
    height: 50,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderColor: "white",
    color: "black",
    fontWeight: "bold",
  },
  chosenButton: {
    display: "flex",
    flexDirection: "column",
    width: 50,
    height: 50,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderColor: "#fc035a",
    color: "black",
    fontWeight: "bold",
  },
});

export default SwipeGesture;
