import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";

interface DayDate {
  day: string;
  date: number;
}
let DateDict: Record<number, string> = {
  0: "N",
  1: "Pn",
  2: "Wt",
  3: "Śr",
  4: "Cz",
  5: "Pt",
  6: "S",
};

interface DateContextInterface {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  weekDays: DayDate[];
  setWeekDays: Dispatch<SetStateAction<DayDate[]>>;
  getWeekDays: (startDate: Date) => void;
  goNextWeek: (startDate: Date) => Date;
  goPreviousWeek: (startDate: Date) => Date;
}

const defaultValues = {
  startDate: new Date(),
  setStartDate: () => {},
  weekDays: [] as DayDate[],
  setWeekDays: () => {},
  getWeekDays: (startDate: Date) => {
    let days: DayDate[] = new Array<DayDate>(7);
    let counter = -startDate.getDay() + 1;
    let currentDate: Date = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + counter);

    for (let i = 0; i < 7; i++) {
      const obj: DayDate = {
        day: DateDict[currentDate.getDay()],
        date: currentDate.getDate(),
      };
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
  const [weekDays, setWeekDays] = useState<DayDate[]>([]);

  const getWeekDays = (startDate: Date): void => {
    let days: DayDate[] = new Array<DayDate>(7);
    let counter = -startDate.getDay() + 1;
    let currentDate: Date = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + counter);

    for (let i = 0; i < 7; i++) {
      const obj: DayDate = {
        day: DateDict[currentDate.getDay()],
        date: currentDate.getDate(),
      };
      currentDate.getDay() == 0
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
      }}
    >
      {children}
    </DateContext.Provider>
  );
};
