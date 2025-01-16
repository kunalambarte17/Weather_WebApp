import React from 'react'
import { weatherCodes } from '../constraints';

function HourlyWeather({hourlyWeather}) {

  const temerature = Math.floor(hourlyWeather.temp_c);
  const time = hourlyWeather.time.split(" ")[1].substring(0, 5);
  const weatherIcon = Object.keys(weatherCodes).find((icon) => weatherCodes[icon].includes(hourlyWeather.condition.code));

  return (
    <div>
        <li className="weather-item">
            <p className="time">{time}</p>
            <img src={`icons/${weatherIcon}.svg`} className="weather-icon" />
            <p className="temperature">{temerature}&#176;</p>
        </li>
    </div>
  )
}

export default HourlyWeather
