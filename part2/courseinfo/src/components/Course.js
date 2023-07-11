import React from 'react';
// import App, { Header, Content, Total } from '../App';

const Header = (props) => {
  // console.log('Header props: ', props.course);

  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  // console.log('Content props: ', props.parts);

  return (
    <div>
      {props.parts.map((part, index) => (
        <Part key={index} name={part.name} count={part.exercises} />
      ))}
    </div>
  )
}

const Part = (props) => {
  // console.log('Part props: ', props);

  return (
    <p>{props.name}: {props.count}</p>
  )
}

const Total = (props) => {
  // console.log('Total props: ', props);
  const totalExercises = props.parts.reduce((total, part) => total + part.exercises, 0);

  return (
    <div>
      <p><b>Number of exercises: {totalExercises}</b></p>
    </div>
  )
}

const Course = (props) => {
  // console.log('Course props: ', props.courses);
  const courses = props.courses;
  // console.log('courses: ', courses);

  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  );
};

export default Course