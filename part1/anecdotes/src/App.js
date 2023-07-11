import { useState } from 'react'

// const points = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0};
// const copy = { ...points };

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({});

  const handleNextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    console.log('randomIndex: ', randomIndex);
    setSelected(randomIndex);
  }

  const handleVote = () => {
    const updatedPoints = { ...points };
    updatedPoints[selected] = (updatedPoints[selected] || 0) + 1;
    setPoints(updatedPoints);
    console.log('updatedPoints: ', updatedPoints);
  }

  const currentVotes = points[selected] || 0;

  const getMaxVotes = () => {
    const maxVotes = Math.max(...Object.values(points));
    const anecdotesWithMaxVotes = Object.entries(points)
      .filter(([_, votes]) => votes === maxVotes)
      .map(([index]) => parseInt(index));

    return anecdotesWithMaxVotes;
  }

  const anecdotesWithMaxVotes = getMaxVotes();

  return (
    <div>
      <div><h2>Anecdote of the Day</h2></div>
      <div>{anecdotes[selected]}</div>&nbsp;
      <div>Total votes: {currentVotes}</div>&nbsp;
      <div>
        <Button handleClick={handleVote} text="vote" />&nbsp;
        <Button handleClick={handleNextAnecdote} text="next anecdote" />
      </div>
      <div><h2>Anecdote with the most votes</h2></div>
      {anecdotesWithMaxVotes.length === 0 ? (
          <p>None</p>
        ) : (
          anecdotesWithMaxVotes.map((index) => (
            <div key={index}>
              <p>{anecdotes[index]}</p>
              <p>Total votes: {points[index]}</p>
            </div>
          ))
        )}
    </div>
  )
};

export default App


