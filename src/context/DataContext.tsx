"use client";
import React, { createContext, useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type TestValue = {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

const dataContext = createContext<TestValue>({
  value: 1,
  setValue: () => {},
});

export default function DataContext({ children }: Props) {
  const [value, setValue] = useState(1);
  return (
    <dataContext.Provider value={{ value, setValue }}>
      {children}
    </dataContext.Provider>
  );
}

export const CountValue = () => useContext(dataContext);
