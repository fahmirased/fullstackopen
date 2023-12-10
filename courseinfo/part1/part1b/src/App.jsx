const Header = (props) => {

  console.log(props)
  return (
  <h1>
    {props.course}
  </h1>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        {props.parts} consist of {props.exercise} exercises.
      </p>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Number of exercises {props.exercise} 
      </p>
    </div>
  )
}

const Hello = (props) => {
  const name = props.name
  const age = props.age
  const bornYear = () => new Date().getFullYear() - age
  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
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
  
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts[0].name} exercise={course.parts[0].exercises} />
      <Content parts={course.parts[1].name} exercise={course.parts[1].exercises} />
      <Content parts={course.parts[2].name} exercise={course.parts[2].exercises} />
      <Total exercise={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}


export default App