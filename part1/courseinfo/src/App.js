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
  // console.log('Content props.name: ', props.part.name);

  return (
    <div>
      <Part name={props.part.name} count={props.part.exercises}/>
    </div>
  )
}

const Part = (props) => {
  console.log('Part props: ', props);

  return (
    <p>{props.name} {props.count}</p>
  )
}

const Total = (props) => {
  console.log('Total props: ', props);

  return (
    <div>
      <p>Number of exercises {props.exercises1.exercises + props.exercises2.exercises + props.exercises3.exercises}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  }

  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  }

  const part3 = {
    name: 'State of a component',
    exercises: 14,
  }

  return (
    <div>
      <Header course={course} />
      <Content part={part1} />
      <Content part={part2} />
      <Content part={part3} />
      <Total exercises1={part1} exercises2={part2} exercises3={part3}/>
    </div>
  )
}

export default App
