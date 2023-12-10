import React from 'react'

const Header = ({courseName}) => {
  return (
  <h1>{courseName}</h1>
  )
}

const Part = ({part}) => {
  console.log(part)
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
    
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course