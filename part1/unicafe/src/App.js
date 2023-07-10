import { useState } from 'react';

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  );
}

const Statistics = (props) => {
  console.log('statistics props: ', props);
  const { good, neutral, bad, total, avg, positive } = props;

  return (
    <div>
      <h2>statistics</h2>
      <div>good: {good}</div>
      <div>neutral: {neutral}</div>
      <div>bad: {bad}</div>
      <div>all: {total}</div>
      <div>average: {avg}</div>
      <div>positive: {positive}%</div>
    </div>
  );
};

const App = () => {
  const name = 'give feedback';
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  const avg = total === 0 ? 'N/A' : (good - bad) / total;
  const positive = total === 0 ? 'N/A' : (good / total) * 100;

  return (
    <div>
      <h2>{name}</h2>
      <Button handleClick={() => setGood(good + 1)} text='good'/>
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button handleClick={() => setBad(bad + 1)} text='bad'/>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        avg={avg}
        positive={positive}
      />
    </div>
  );
}

export default App;
