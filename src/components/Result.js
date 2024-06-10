import React from 'react';

const Result = ({ carbonFootprint }) => (
  <div>
    <h2>Tu huella de carbono:</h2>
    <p>Diaria: {carbonFootprint.daily.toFixed(2)} kg CO₂e</p>
    <p>Mensual: {carbonFootprint.monthly.toFixed(2)} kg CO₂e</p>
    <p>Anual: {carbonFootprint.yearly.toFixed(2)} kg CO₂e</p>
  </div>
);

export default Result;
