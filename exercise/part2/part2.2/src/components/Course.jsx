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
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <strong>
      total of {totalExercises} exercises
      </strong>
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