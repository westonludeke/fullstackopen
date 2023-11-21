import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculator } from './calculator';

const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hell Full Stack!');
});

interface Response {
  weight: number;
  height: number;
  bmi: string;
}

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  const bmi: string = calculateBmi(weight, height);
  const response: Response = {
    weight,
    height,
    bmi
  };

  console.log(height);

  if ( !(weight && height) || Number.isNaN(weight) || Number.isNaN(height) ) {
    res.json({ error: 'malformed request parameters' });
  }

  res.json(response);
});

app.post('/calculate', (req, res) => {
  const { value1, value2, op } = req.body;

  const result = calculator(value1, value2, op);
  res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});