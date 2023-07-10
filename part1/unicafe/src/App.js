import { useState } from 'react';

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  );
};

const StatisticLine = (props) => {
  const { text, value } = props;
  return <div>{text}: {value}</div>
};

const Statistics = (props) => {
  // console.log('statistics props: ', props);
  const { good, neutral, bad, total, avg, positive } = props;

  if (total === 0){
    return <div><p>no feedback given</p></div>;
  }

  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={avg} />
      <StatisticLine text="positive" value={`${positive}%`} />
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

      <h2>statistics</h2>
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
};

export default App;
