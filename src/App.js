import React, { useState } from 'react';
import Header from './components/Header';
import Calculator from './components/Calculator';
import Result from './components/Result';
import styles from './styles';

const App = () => {
  const [carbonFootprint, setCarbonFootprint] = useState(null);

  const handleCalculate = (footprint) => {
    setCarbonFootprint(footprint);
  };

  return (
    <div style={styles.app}>
      <Header />
      <div style={styles.content}>
        <Calculator onCalculate={handleCalculate} />
        {carbonFootprint && <Result carbonFootprint={carbonFootprint} />}
      </div>
    </div>
  );
};

export default App;
