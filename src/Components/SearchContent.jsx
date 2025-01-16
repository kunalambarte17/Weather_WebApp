import React from 'react'

function SearchContent({getWeatherDetails, searchInputRef}) {
    const API_KEY = import.meta.env.VITE_API_KEY;

    const handleCitySubmit = (e) => {
        e.preventDefault();
        const searchInput = e.target.querySelector(".search-input");
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.value}&days=2`;
        getWeatherDetails(API_URL); 
    }

    const handleLoctionSearch = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log(position);
          const {latitude, longitude} = position.coords;
          const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2`;
          getWeatherDetails(API_URL);

          window.innerWidth >= 768 && searchInputRef.current.focus();
        },
        () => {
          alert("Please enable location to use this feature");
        }
      );
    }

  return (
    <div>
      <div className="search-section">
        <form action="#" className='search-form' onSubmit={handleCitySubmit}>
        <span className="material-symbols-rounded">search</span>
          <input type="search" placeholder='Enter a city name' ref={searchInputRef} className='search-input' required/>
        </form>
        <button className="location-button" onClick={handleLoctionSearch}>
        <i className="fa-solid fa-location-crosshairs"></i>
        </button>
      </div>
    </div>
  )
}

export default SearchContent
