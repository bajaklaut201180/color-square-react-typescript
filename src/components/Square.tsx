import React from 'react';
import './square.css';

interface Item {
  title: string;
  data: any;
  handleClick: (data: string) => void;
}

function Square({title, data, handleClick} : Item) {
  
  return (
    <div className="square__wrapper"> 
      {
        data.map((value:any, key: number) => ( 
          <div className="square__color" key={key} style={{backgroundColor: `${value.hexColor}`}} onClick={() => handleClick(value.hslColor)}>
            <span>{key+1}</span>
          </div>
        ))
      }
    </div>
  );
}

export default Square;