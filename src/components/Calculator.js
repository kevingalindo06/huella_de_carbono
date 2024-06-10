import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Slide from '@mui/material/Slide';
import Confetti from 'react-confetti';
import Result from './Result';
import styles from '../styles'; // Importa los estilos desde styles.js

const Calculator = ({ onCalculate }) => {
  const [responses, setResponses] = useState({
    electricity: '',
    water: '',
    transportation: '',
    waste: '',
    food: '',
    shopping: '',
    appliances: '',
    heating: '',
    cooling: '',
    other: '',
  });

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [carbonFootprint, setCarbonFootprint] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setResponses({ ...responses, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion <= questions.length) {
      const currentResponse = responses[questions[currentQuestion - 1].name];
      if (currentResponse !== '') {
        setCurrentQuestion(nextQuestion);
      } else {
        alert('Por favor, responde la pregunta antes de continuar.');
      }
    } else {
      if (allQuestionsAnswered()) {
        calculateCarbonFootprint();
      } else {
        alert('Por favor, responde todas las preguntas antes de calcular.');
      }
    }
  };

  const calculateCarbonFootprint = () => {
    const numericResponses = Object.values(responses).map((value) =>
      isNaN(parseFloat(value)) ? 0 : parseFloat(value)
    );
    const footprint = numericResponses.reduce((acc, curr) => acc + curr, 0);
    const calculatedFootprint = {
      daily: footprint,
      monthly: footprint * 30,
      yearly: footprint * 365,
    };
    setCarbonFootprint(calculatedFootprint);
    onCalculate(calculatedFootprint); // Callback to update the result in App.js
    setShowConfetti(true);
    setShowResult(true);
  };

  const allQuestionsAnswered = () => {
    return Object.values(responses).every(response => response !== '');
  };

  const questions = [
    {
      id: 1,
      question: 'Electricidad consumida (kWh)',
      name: 'electricity',
      type: 'number'
    },
    {
      id: 2,
      question: 'Consumo de agua (litros)',
      name: 'water',
      type: 'number'
    },
    {
      id: 3,
      question: 'Medio de transporte utilizado:',
      name: 'transportation',
      type: 'radio',
      options: ['Automóvil', 'Transporte público', 'Bicicleta', 'Caminar']
    },
    {
      id: 4,
      question: 'Desechos generados (kg)',
      name: 'waste',
      type: 'number'
    },
    {
      id: 5,
      question: 'Consumo de alimentos (kg)',
      name: 'food',
      type: 'number'
    },
    {
      id: 6,
      question: 'Frecuencia de compras (veces al mes)',
      name: 'shopping',
      type: 'radio',
      options: ['1-2 veces', '3-5 veces', 'Más de 5 veces']
    },
    {
      id: 7,
      question: 'Uso de electrodomésticos (horas al día)',
      name: 'appliances',
      type: 'number'
    },
    {
      id: 8,
      question: 'Uso de calefacción (horas al día)',
      name: 'heating',
      type: 'number'
    },
    {
      id: 9,
      question: 'Uso de aire acondicionado (horas al día)',
      name: 'cooling',
      type: 'number'
    },
    {
      id: 10,
      question: 'Otros consumos (kg)',
      name: 'other',
      type: 'number'
    },
  ];

  return (
    <div style={styles.app}> {/* Aplica estilos al contenedor principal */}
      {!showResult && (
        <form onSubmit={handleSubmit} style={styles.form}> {/* Aplica estilos al formulario */}
          {questions.map(({ id, question, name, type, options }) => (
            currentQuestion === id && (
              <Slide key={id} direction="right" in={currentQuestion === id}>
                <div>
                  <h2 style={styles.content}>{`Pregunta ${id}`}</h2> {/* Aplica estilos al contenido */}
                  {type === 'number' ? (
                    <TextField
                      name={name}
                      label={question}
                      value={responses[name]}
                      onChange={handleChange}
                      fullWidth
                      required
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                    />
                  ) : (
                    <FormControl component="fieldset" fullWidth>
                      <FormLabel component="legend" style={styles.content}>{question}</FormLabel> {/* Aplica estilos al contenido */}
                      <RadioGroup
                        aria-label={name}
                        name={name}
                        value={responses[name]}
                        onChange={handleChange}
                      >
                        {options.map(option => (
                          <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  )}
                </div>
              </Slide>
            )
          ))}
          <Button type="submit" variant="contained" style={styles.button}> {/* Aplica estilos al botón */}
            {currentQuestion === questions.length ? 'Calcular' : 'Siguiente'}
          </Button>
        </form>
      )}
      {showResult && carbonFootprint && !showConfetti && (
        <div style={styles.result}> {/* Aplica estilos al resultado */}
          <Result carbonFootprint={carbonFootprint}/>
          <Confetti />
          {setShowConfetti(true)}
        </div>
      )}
    </div>
  );
};

export default Calculator;

