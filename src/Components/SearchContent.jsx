import React from 'react'

function SearchContent({getWeatherDetails}) {
    const API_KEY = import.meta.env.VITE_API_KEY;

    const handleCitySubmit = (e) => {
        e.preventDefault();
        const searchInput = e.target.querySelector(".search-input");
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.value}&days=2`;
        getWeatherDetails(API_URL); 
    }
  return (
    <div>
      <div className="search-section">
        <form action="#" className='search-form' onSubmit={handleCitySubmit}>
        <span className="material-symbols-rounded">search</span>
          <input type="search" placeholder='Enter a city name' className='search-input' required/>
        </form>
        <button className="location-button">
        <i className="fa-solid fa-location-crosshairs"></i>
        </button>
      </div>
    </div>
  )
}

export default SearchContent
