import { useState } from 'react'
import Note from './components/Note'

const Part = ({name, exercises}) => (
  <div>{name} {exercises}</div>
) 

const Course = ({course}) => {
  const total = course.parts.reduce((accumulator, current) => accumulator + current.exercises, 0)
  return (
   <div>
      <h1>{course.name}</h1>
      {course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
      <b>total of {course.parts.reduce((acc, curr) => acc + curr.exercises, 0)} exercises</b>
   </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <div>{courses.map(course => <Course key={course.id} course={course}/>)}</div>
}

export default App
