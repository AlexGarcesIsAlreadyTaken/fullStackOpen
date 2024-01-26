
const Header = (props) => {
  //console.log(props.course)
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  console.log(props);
  return(
    <p>{props.part} {props.exercises}</p> 
  )
}

const Content = (props) => {
  return (
    <div id='content'>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  //console.log(props)
  return (
  <p>
    Number of exercises {props.total}
  </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  let sum = 0
  course.parts.forEach(elem => {sum += elem.exercises})
  console.log('sum ' + sum)
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total total={sum} />
    </div>
  )
}

export default App
