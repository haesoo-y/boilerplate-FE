import React from 'react';

interface TestProps {
  num: number;
  onClick: () => void;
}

const Test = ({ num, onClick }: TestProps) => {
  return (
    <>
      <h2>숫자는 {num}</h2>
      <button onClick={onClick}>PLUS</button>
    </>
  );
};

export default Test;
