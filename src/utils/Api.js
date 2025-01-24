// utils/api.js
export const fetchWeatherData = async (city, allIcons, defaultIcon) => {
    if (!city) throw new Error("City name cannot be empty");
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
    
    const response = await fetch(url);
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch weather data");
    }
  
    const icon = allIcons[data.weather[0]?.icon] || defaultIcon;
  
    return {
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      temperature: Math.floor(data.main.temp),
      location: data.name,
      icon,
    };
  };
  