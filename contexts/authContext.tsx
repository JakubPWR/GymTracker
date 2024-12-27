import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface AuthContextInterface {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  logged: boolean;
  setLogged: Dispatch<SetStateAction<boolean>>;
}

const defaultValues = {
  email: "",
  setEmail: () => {},
  password: "",
  setPassword: () => {},
  logged: false,
  setLogged: () => {},
} as AuthContextInterface;

export const AuthContext = createContext<AuthContextInterface>(defaultValues);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/(tabs)/(MainPage)/Excercises");
        setLogged(true);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{ email, setEmail, password, setPassword, logged, setLogged }}
    >
      {children}
    </AuthContext.Provider>
  );
};
