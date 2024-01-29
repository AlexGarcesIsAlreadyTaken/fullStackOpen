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

export default Course
