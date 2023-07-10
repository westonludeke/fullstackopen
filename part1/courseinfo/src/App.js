const Header = (props) => {
  console.log('Header props: ', props);

  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log('Content props: ', props);

  return (
    <div>
      {props.parts.map((part, index) => (
        <Part key={index} name={part.name} count={part.exercises} />
      ))}
    </div>
  )
}

const Part = (props) => {
  console.log('Part props: ', props);

  return (
    <p>{props.name}: {props.count}</p>
  )
}

const Total = (props) => {
  console.log('Total props: ', props);
  const totalExercises = props.parts.reduce((total, part) => total + part.exercises, 0);

  return (
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
    },
    {
      name: 'State of a component',
      exercises: 14,
    },
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
