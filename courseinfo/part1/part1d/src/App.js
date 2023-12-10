import { useState } from 'react'

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value', counter)

  const increaseByOne = () => {
    console.log('increasing, value before', counter)
    setCounter(counter + 1)
  }

  const decreaseByOne = () => { 
    console.log('decreasing, value before', counter)
    setCounter(counter - 1)
  }

  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(left + updatedRight)
  }

  const History = (props) => {
    if (props.allClicks.length === 0) {
      return (
        <div>
          the app is used by pressing the buttons
        </div>
      )
    }
    return (
      <div>
        button press history: {props.allClicks.join(' ')}
      </div>
    )
  }
  
  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  const [value, setValue] = useState(10)

  const handleClick = () => {
    console.log('clicked the button')
    setValue(0)
  }

  const hello = (who) => () => {
      console.log('hello', who)
    }

  return (
    <div>
      <Display counter={counter}/>

      <Button
        onClick={increaseByOne}
        text='plus'
      />
      <Button
        onClick={setToZero}
        text='zero'
      />     
      <Button
        onClick={decreaseByOne}
        text='minus'
      />           

      {left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      {right}
      <p>{allClicks.join(' ')}</p>
      <p>total {total}</p>
      <History allClicks={allClicks} />

      {value}
      <button onClick={hello('world')}>button</button>
      <button onClick={hello('react')}>button</button>
      <button onClick={hello('function')}>button</button>
    </div>
  )
}

export default App