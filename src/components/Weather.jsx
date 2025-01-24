import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import rain_icon from '../assets/rain.png';
import Loader from './Loader';
import { fetchWeatherData } from '../utils/Api';

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const [loader, setLoader] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (!city) {
      alert("Enter City Name");
      return;
    }

    setLoader(true);
    try {
      const weather = await fetchWeatherData(city, allIcons, clear_icon);
      setWeatherData(weather);
    } catch (error) {
      console.error(error.message);
      alert(error.message);
      setWeatherData(null);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    search("Assam"); // Default weather data for Assam
  }, []);

  return (
    <>
      {loader ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : weatherData ? (
        <div className="weather">
          <div className="search-bar">
            <input ref={inputRef} type="text" placeholder="Search" />
            <img
              src={search_icon}
              alt="Search"
              onClick={() => search(inputRef.current.value)}
            />
          </div>

          <img
            src={weatherData.icon}
            alt="Weather Icon"
            className="weather-icon"
          />
          <p className="temperature">{weatherData.temperature}°c</p>
          <p className="location">{weatherData.location}</p>

          <div className="weather-data">
            <div className="col-1">
              <img src={humidity_icon} alt="Humidity Icon" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col-2">
              <img src={wind_icon} alt="Wind Speed Icon" />
              <div>
                <p>{weatherData.windSpeed}Km/hr</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No data available. Please search for a city.</p>
      )}
    </>
  );
};

export default Weather;
