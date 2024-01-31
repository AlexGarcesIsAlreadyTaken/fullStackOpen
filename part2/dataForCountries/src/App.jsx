import { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({city}) => {
  const [weather, setWeather] = useState(null)
  
  const key = '00266d2969e14c51a04215706243101'
  const baseURL = 'http://api.weatherapi.com/v1'
  useEffect(() => {
    axios.get(`${baseURL}/current.json?key=${key}&q=${city}`)
      .then(response => setWeather(response.data.current))
    .catch(error => console.log('error type', error.response.status))
  }, [])
  if (weather === null) return null
  return (
    <div>
      <h3>Weather in {city}</h3>
      <div>temperature: {weather.temp_c} celsius</div>
      <img src={`https:${weather.condition.icon}`} alt={weather.condition.text}/>
      <div>wind: {weather.wind_kph} km/h</div>
    </div>
  )
}

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
    setIsShowable(aux)
  }

  if (!countries) return null
  if (countries.length > 10) return (<div>Too many matches, specify another filter</div>)
  if (countries.length !== 1) return (
      <div>
        {countries.map(country => 
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={() => handleShow(countries.indexOf(country))}>show</button>
          {isShowable[countries.indexOf(country)] ? <Countrie countrie={country}/> : null}
        </div>)}
      </div>
  )
  const country = countries.find(x => true)
  return (
    <div>
      <Countrie countrie={country} />
      <Weather city={country.capital.find(() => true)}/>
    </div>
  )
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
