import React from 'react'
import SearchContent from './Components/SearchContent'
import CurrentWeather from './Components/CurrentWeather'
import HourlyWeather from './Components/HourlyWeather'
import { weatherCodes } from './constraints';

function App() {

  const [currentWeather, setCurrentWeather] = React.useState({});
  const [hourlyForecast, setHourlyForecast] = React.useState([]);

  const filterHourlyForecast = (hourlyData) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24Hours = currentHour + 24 * 60 * 60 * 1000;

    const next24HoursData = hourlyData.filter(({time}) => {
      const forcastTime = new Date(time).getTime();
      return forcastTime >= currentHour && forcastTime <= next24Hours;
    });

    setHourlyForecast(next24HoursData)
  }

  const getWeatherDetails = async (API_URL) => {
    try{
      const response = await fetch(API_URL);
      const data = await response.json();
    
      const temerature = Math.floor(data.current.temp_c);
      const description = data.current.condition.text;
      const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(data.current.condition.code));

      setCurrentWeather({temerature, description, weatherIcon});
      
      const combinedHourlyData = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[0].hour ];
      filterHourlyForecast(combinedHourlyData)

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container'>
      
      <SearchContent getWeatherDetails={getWeatherDetails}/>

      {/* Container 2 */}
      <div className="weather-section">
        
        <CurrentWeather currentWeather={currentWeather}/>

        <div className="hourly-forecast">
          <ul className="weather-list">
            {hourlyForecast.map( (hourlyWeather) => ( 
              <HourlyWeather key={hourlyWeather.time_epoch} hourlyWeather={hourlyWeather}/>
            ))}
          </ul>
        </div>
      </div>
    </div>

  )
}

export default App
