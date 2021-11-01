import React, { useState } from 'react';
import Test from './Test';

const App: React.FC = () => {
  const [num, setNum] = useState(0);
  const onClick = (): void => {
    setNum((prev) => prev + 1);
  };
  return <Test num={num} onClick={onClick} />;
};

export default App;
