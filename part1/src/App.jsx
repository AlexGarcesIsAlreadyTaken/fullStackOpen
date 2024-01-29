import { useState } from "react"

const Button = ({handleClick, text}) => {
  return (<button onClick={handleClick}>{text}</button>)
}

const StatisticLine = ({text, value}) => {
  return (<tr><td>{text}</td> <td>{value}</td></tr>)
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = () => {
    if (total != 0) return (good - bad)/total
    return 0
  }

  const positive = () => {
    if (total != 0) return good/total
    return 0
  }

  if (good != 0 || bad != 0 || neutral != 0) return (
  <table>
      <tbody>
      <StatisticLine text='good' value={good}/>
      <StatisticLine text='neutral' value={neutral}/>
      <StatisticLine text='bad' value={bad}/>
      <StatisticLine text='all' value={total}/>
      <StatisticLine text='average' value={average()}/>
      <StatisticLine text='positive' value={positive()*100 + '%'}/>
      </tbody>
    </table>
  )
  return <>No feedback given</>
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
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>


    </div>
  )
}

export default App
