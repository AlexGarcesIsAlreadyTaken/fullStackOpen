import { useState } from "react"

const Button = ({handleClick, text}) => {
  return (<button onClick={handleClick}>{text}</button>)
}

const Statistic = ({text, value}) => {
  return (<div>{text} {value}</div>)
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={() => setGood(good + 1)} text='good'/>
        <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
        <Button handleClick={() => setBad(bad + 1)} text='bad'/>
      </div>
      <div>
        <h1>statistics</h1>
        <Statistic text='good' value={good}/>
        <Statistic text='neutral' value={neutral}/>
        <Statistic text='bad' value={bad}/>
        
      </div>


    </div>
  )
}

export default App
