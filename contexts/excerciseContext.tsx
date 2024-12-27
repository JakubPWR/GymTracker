import { db } from "@/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import React, {
  Children,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

const ExcerciseDict: Record<number, string> = {
  0: "Chest",
  1: "Back",
  2: "Arms",
  3: "Legs",
  4: "Core",
};
export type Excercise = {
  id: string;
  category: string;
  name: string;
  weight: number;
  reps: number;
  sets: number;
  date: Date;
  userId: string;
};

interface ExcerciseContextInterface {
  excercises: Excercise[];
  setExcercises: Dispatch<SetStateAction<Excercise[]>>;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  selectedExcerciseId: string;
  setSelectedExcerciseId: Dispatch<SetStateAction<string>>;
}

const defaultValues = {
  excercises: [
    {
      id: "",
      category: "",
      name: "",
      weight: 0,
      sets: 0,
      reps: 0,
      date: new Date(),
      userId: "ssdasdas",
    },
  ],
  setExcercises: () => {},
  selectedCategory: "",
  setSelectedCategory: () => {},
  selectedExcerciseId: "",
  setSelectedExcerciseId: () => {},
} as ExcerciseContextInterface;

export const ExcerciseContext =
  createContext<ExcerciseContextInterface>(defaultValues);

export const ExcerciseContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const exercisesCollectionRef = collection(db, "Exercises");
  const [excercises, setExcercises] = useState<Excercise[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedExcerciseId, setSelectedExcerciseId] = useState("");
  const getExercisesList = async () => {
    try {
      const data = await getDocs(exercisesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...(doc.data() as Excercise),
        id: doc.id,
      }));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getExercisesList();
  }, []);
  return (
    <ExcerciseContext.Provider
      value={{
        selectedExcerciseId,
        setSelectedExcerciseId,
        excercises,
        setExcercises,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </ExcerciseContext.Provider>
  );
};
