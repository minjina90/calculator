import React, {useContext} from 'react';
import { CalcContext } from "../context/CalcProvider"

const getClassName = btn => {
  const className = {
    'C' : 'span',
    'DEL' : 'span',
    'x' : 'ope',
    '÷' : 'ope',
    '+' : 'ope',
    '-' : 'ope',
    '=' : 'ope',
  }
  return className[btn];
};

function Button({ value }) {
  const {display, setDisplay} = useContext(CalcContext);

  function clearClick() {
    setDisplay([]);
  };

  function deleteClick() {
    const numSlice = display.slice(0, -1);
    setDisplay(numSlice);
  };

  function percentClick() {
    const string = parseInt(display.join(''));
    setDisplay(string/100);
  };

  function updateNumbers(num) {
    const stringNumber = num.toString();
    const integer = parseFloat(stringNumber.split('.')[0]);
    const decimal = stringNumber.split('.')[1];
    let intDisplay
    if (isNaN(integer)) {
      intDisplay = '';
    } else {
      intDisplay = integer.toLocaleString('en', {maximumFractionDigits: 0});
    }
    if (decimal != null) {
      return `${intDisplay}.${decimal}`;
    } else {
      return intDisplay;
    }
  }

  function calculate() {
    const string = display.join('');

    const calc = (i = 0) => {
      let result = 0;
      let num = '';
      let prev = 0;
      let operation = '+';

      for(; i < string.length; i++) {
        const currElement = string[i];

        if(!isNaN(currElement) || currElement === '.') {
          num = num + currElement;
        }

        if((isNaN(currElement) || i === string.length - 1) && currElement !== '.') {
          let currNum = parseFloat(num);

          if(currElement === '(') {
            ({i, currNum} = calc(i + 1));
          }

          if(operation === '+') {
            result += prev;
            prev = currNum;
          } else if (operation === '-') {
            result += prev;
            prev = -currNum;
          } else if (operation === '÷') {
            prev = prev / currNum;
          } else if (operation === 'x') {
            prev = prev * currNum;
          } else if (operation === '^') {
            prev = Math.pow(prev, currNum);
          }

          num = '';
          operation = currElement;

          if(currElement === ')') {
            return {i, currNum: result + prev};
          }
        }
      }
      setDisplay(updateNumbers((result + prev).toFixed(2)));
  }
  return calc();
  }

  function handleClick() {
    if (value === 'C') {
      clearClick();
    } else if (value === 'DEL') {
      deleteClick();
    } else if (value === '%'){
      percentClick();
    } else if (value === '=') {
      calculate();
    } else {
      setDisplay(oldValue => [...oldValue, value]);
    }
  }

  return (
    <button className={`${getClassName(value)} button`} onClick={handleClick}>
      {value}
    </button>
  );
};

export default Button;
