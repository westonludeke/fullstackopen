const Header = (props) => {
  console.log('Header props: ', props.course);

  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log('Content props: ', props.parts);

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
      <p><b>Number of exercises: {totalExercises}</b></p>
    </div>
  )
}

const Course = (props) => {
  console.log('Course props: ', props.course);
  const course = props.course;

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = { 
    name: 'Half Stack application development',
    parts: [
      {
        id: 1,
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        id: 2,
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        id: 3,
        name: 'State of a component',
        exercises: 14,
      },
      {
        id: 4,
        name: 'Redux',
        exercises: 11,
      },
    ]
  }

  return (
    <Course course={course} />
  )
}

export default App