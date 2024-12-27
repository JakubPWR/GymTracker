import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";

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

interface DateContextInterface {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  weekDays: Date[];
  setWeekDays: Dispatch<SetStateAction<Date[]>>;
  getWeekDays: (startDate: Date) => void;
  goNextWeek: (startDate: Date) => Date;
  goPreviousWeek: (startDate: Date) => Date;
  chosenDate: Date;
  setChosenDate: Dispatch<SetStateAction<Date>>;
}

const defaultValues = {
  startDate: new Date(),
  setStartDate: () => {},
  weekDays: [] as Date[],
  setWeekDays: () => {},
  chosenDate: new Date(),
  setChosenDate: () => {},
  getWeekDays: (startDate: Date) => {
    let days: Date[] = new Array<Date>(7);
    let counter = -startDate.getDay() + 1; ///1
    let currentDate: Date = new Date(startDate); //22.12.2024
    currentDate.setDate(currentDate.getDate() + counter); /// 23.12.2024

    for (let i = 0; i < 7; i++) {
      const obj: Date = currentDate;
      currentDate.getDay() == 0
        ? (days[6] = obj)
        : (days[currentDate.getDay() - 1] = obj);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
  },
  goNextWeek: (startDate: Date) => {
    const nextWeek: Date = new Date(startDate);
    nextWeek.setDate(startDate.getDate() + 7);
    return nextWeek;
  },
  goPreviousWeek: (startDate: Date): Date => {
    const nextWeek: Date = new Date(startDate);
    nextWeek.setDate(startDate.getDate() - 7);
    return nextWeek;
  },
} as DateContextInterface;

export const DateContext = createContext<DateContextInterface>(defaultValues);

export const DateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [weekDays, setWeekDays] = useState<Date[]>([]);
  const [chosenDate, setChosenDate] = useState<Date>(new Date());
  const getWeekDays = (startDate: Date): void => {
    let days: Date[] = new Array<Date>(7);
    let counter = -startDate.getDay() + 1;
    if (counter == 1) {
      counter = -6;
    }
    let currentDate: Date = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + counter);

    for (let i = 0; i < 7; i++) {
      const obj: Date = new Date(currentDate);
      obj.getDay() == 0
        ? (days[6] = obj)
        : (days[currentDate.getDay() - 1] = obj);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setWeekDays(days);
  };

  const goNextWeek = (startDate: Date): Date => {
    const nextWeek: Date = new Date(startDate);
    nextWeek.setDate(startDate.getDate() + 7);
    return nextWeek;
  };
  const goPreviousWeek = (startDate: Date): Date => {
    const nextWeek: Date = new Date(startDate);
    nextWeek.setDate(startDate.getDate() - 7);
    return nextWeek;
  };

  useEffect(() => {
    getWeekDays(startDate);
  }, [startDate]);
  return (
    <DateContext.Provider
      value={{
        startDate,
        setStartDate,
        weekDays,
        setWeekDays,
        getWeekDays,
        goNextWeek,
        goPreviousWeek,
        chosenDate,
        setChosenDate,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};
