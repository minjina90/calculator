import React, {useContext} from 'react';
import { CalcContext } from "../context/CalcProvider";

function Screen() {
  const {display} = useContext(CalcContext);

  return (
    <div className="screen">
      {display}
    </div>
  );
};

export default Screen;