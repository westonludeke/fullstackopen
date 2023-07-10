import { useState } from 'react'

// -----

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const name = 'give feedback';
  // save clicks of each button to its own state
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
      <div>good: {good}</div>
      <div>neutral: {neutral}</div>
      <div>bad: {bad}</div>
      <div>all: {total}</div>
      <div>average: {avg}</div>
      <div>positive: {positive}%</div>
    </div>
  )
}

// -----
export default App