import React from 'react';
import Screen from "./components/Screen";
import Button from "./components/Button";
import CalcProvider from "./context/CalcProvider";

const buttonValues = [
  'C','(', ')',
  'DEL','%', 'x',
  7, 8, 9, '÷',
  4, 5, 6, '+',
  1, 2, 3, '-',
  '.', 0, '^', '='
];

function App() {
  return (
    <CalcProvider>
      <div className="calculator">
        <Screen/>
        {buttonValues.map((btn, i) => {
          return (
            <Button
              key={i}
              value={btn}
            />
          )
        })}
      </div>
    </CalcProvider>
  );
};

export default App;
