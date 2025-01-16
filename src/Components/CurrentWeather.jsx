import React from 'react'

function CurrentWeather({currentWeather}) {
  return (
    <div>
      <div className="current-weather">
          <img src={`icons/${currentWeather.weatherIcon}.svg`} className="weather-icon" />
          <h2 className="temperature">
            {currentWeather.temerature}&#176;
          </h2>
          <p className="description">{currentWeather.description}</p>
        </div>
    </div>
  )
}

export default CurrentWeather
