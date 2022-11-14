import {createContext, useState} from "react";

export const CalcContext = createContext();

function CalcProvider({children}) {
  const [display, setDisplay] = useState([]);

  const providerValue = {
    display, setDisplay
  };

  return (
    <CalcContext.Provider value={providerValue}>
      {children}
    </CalcContext.Provider>
  );
};

export default CalcProvider;