import React, { useEffect } from 'react'
import SearchContent from './Components/SearchContent'
import CurrentWeather from './Components/CurrentWeather'
import HourlyWeather from './Components/HourlyWeather'
import NoResultsDiv from './Components/NoResultsDiv'
import { weatherCodes } from './constraints';

function App() {

  const API_KEY = import.meta.env.VITE_API_KEY;
  const [currentWeather, setCurrentWeather] = React.useState({});
  const [hourlyForecast, setHourlyForecast] = React.useState([]);
  const [hasNoResults, setHasNoResults] = React.useState(false);
  const searchInputRef = React.useRef(null);

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
    setHasNoResults(false);
    window.innerWidth <= 768 && searchInputRef.current.focus();

    try{
      const response = await fetch(API_URL);
      if(!response.ok) throw new Error('No results found');
      const data = await response.json();
    
      const temerature = Math.floor(data.current.temp_c);
      const description = data.current.condition.text;
      const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(data.current.condition.code));

      setCurrentWeather({temerature, description, weatherIcon});
      
      const combinedHourlyData = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour ];

      searchInputRef.current.value = data.location.name;
      filterHourlyForecast(combinedHourlyData)

    } catch {
      setHasNoResults(true);
    }
  }

  useEffect(() => {
    const defaultCity = 'Saoner';
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity}&days=2`;
    getWeatherDetails(API_URL);
  }, [])  


  return (
    <div className='container'>
      
      <SearchContent getWeatherDetails={getWeatherDetails} searchInputRef={searchInputRef}/>

      {hasNoResults ? (
        <NoResultsDiv />
      ) : (
        <div className="weather-section">
        
        <CurrentWeather currentWeather={currentWeather}/>

        <div className="hourly-forecast">
          <ul className="weather-list">
            {hourlyForecast.map((hourlyWeather) => ( 
              <HourlyWeather key={hourlyWeather.time_epoch} hourlyWeather={hourlyWeather}/>
            ))}
          </ul>
        </div>
      </div>

      )
    }

    </div>

  )
}

export default App
