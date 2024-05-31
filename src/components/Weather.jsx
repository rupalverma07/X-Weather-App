import React, { useState } from 'react'
import './weather.css'

const Weather = () => {
    const apiKey = "f787ad7041214bfc8d5161348243005"
    const[inputValue, setInputValue] = useState('')
    const[weatherData, setWeatherData] = useState({})
    const[isLoading, setIsLoading] = useState(false)
    const[showCard, setShowCard] = useState(false)
    const getWeatherData = async() =>{ 
        try {
            setIsLoading(true)
            const res =  await fetch(`http://api.weatherapi.com/v1/current.json?q=${inputValue}&key=${apiKey}`);
            const data = await res.json();
            if(data.error.code === 1006){
                alert('failed to fetch weather data')
                setIsLoading(false)
                return ;
            }
            console.log(data)
            setWeatherData(data)
            setIsLoading(false)
            setShowCard(true)  
        } catch (error) {
            console.log(error,'error')
        }
        
    }
    const searchHandler = () =>{
        getWeatherData()
    }
  return (
    <div className='container'>
        <div className='searchBox'>
        <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={searchHandler}>Search</button>
        </div>
        {isLoading ? (<div style={{marginTop:"20px"}}>Loading data...</div>) : (null)}
        {showCard ? (<div className='weather-cards'>
            <div className='weather-card'>
                <h5>Temperature</h5>
                <p>{ weatherData?.current?.temp_c}&deg;C</p>
            </div>
            <div className='weather-card'>
                <h5>Humidity</h5>
                <p>{ weatherData?.current?.humidity}%</p>
            </div>
            <div className='weather-card'>
                <h5>Condition</h5>
                <p>{ weatherData?.current?.condition?.text}</p>
            </div>
            <div className='weather-card'>
                <h5>Wind Speed</h5>
                <p>{ weatherData?.current?.wind_kph}kph</p>
            </div>
        </div>) : (null)}
        
    </div>
  )
}
export default Weather
