import React, { PropsWithChildren } from "react";

interface InputContextModel {
  inputValue: string;
  setInputValue: (value: string) => void;
}

export const InputContext = React.createContext<InputContextModel>(undefined);

export const InputProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [inputValue, setInputValue] = React.useState<string>("");

  return (
    <InputContext.Provider value={{ inputValue, setInputValue }}>
      {children}
    </InputContext.Provider>
  );
};
