import { useEffect, useState } from 'react'
import axios from 'axios'

const Countrie = ({countrie}) => {
  const languages = Object.keys(countrie.languages) 
  const imageURL = countrie.flags.png
  const imageAlt = countrie.flags.alt
  return (
   <div>
      <h2>{countrie.name.common}</h2>
      <div>capital {countrie.capital}</div>
      <div>area {countrie.area}</div>
      <h3>languages:</h3>
      <ul>
        {languages.map(language => <li key={language}>{countrie.languages[language]}</li>)}
      </ul>
      <img src={imageURL} alt={imageAlt}/>
   </div>
  )

}

const Countries = ({countries}) => {

  const [isShowable, setIsShowable] = useState()
  
  useEffect(
    () => {
      if (countries === null) return
      setIsShowable(Array(countries.length).fill(false))
    }
    , [countries])

  const handleShow = (index) => {
    const aux = [...isShowable]
    aux[index] = !aux[index]
    console.log('isShowable', aux)
    setIsShowable(aux)
  }

  if (!countries) return null
  if (countries.length > 10) return (<div>Too many matches, specify another filter</div>)
  if (countries.length !== 1) return (
      <div>
        {countries.map(countrie => 
        <div key={countrie.name.common}>
          {countrie.name.common}
          <button onClick={() => handleShow(countries.indexOf(countrie))}>show</button>
          {isShowable[countries.indexOf(countrie)] ? <Countrie countrie={countrie}/> : null}
        </div>)}
      </div>
  )
  return <Countrie countrie={countries.find(x => true)} />
}

const App = () => {

  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState(null)
  
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }


  useEffect( () => {
    if (search === '') {
      setCountries(null)
      return
    }
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(
      response => {
        const newCountries = response.data.filter(countrie => countrie.name.common.toLowerCase().includes(search.toLowerCase()))
        if (newCountries.length === 0) setCountries(null)
        else setCountries(newCountries)
      }
    )
    
  }
  , [search])

  
  return (
    <div>
      <form onSubmit={event => event.preventDefault()}>
      find countries <input type='search' value={search} onChange={handleSearch} />
      </form>
      <Countries countries={countries}/>
    </div>
  )
}

export default App
