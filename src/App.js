import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [searchCity, setSearchCity] = useState("");
  const API_KEY = "8cc2d2ae8d4e5f3d039172de98aba3e1";

  const getWeatherByCity = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${API_KEY}`
    );
    const data = await res.json();
    setWeather(data);
    setSearchCity("");
  };

  const getWeatherByCoords = async (lat, lon) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    const data = await res.json();
    setWeather(data);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      getWeatherByCoords(latitude, longitude);
    });
  }, []);

  return (
    <div>
      <h1>Today's Weather</h1>

      {weather && (
        <div>
          <h2>📍{weather?.name}</h2>
          <h3>🌡️{weather?.main?.temp}°C</h3>
          <p>{weather.weather[0].description}</p>
        </div>
      )}

      <input
        type="text"
        placeholder="Enter City"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
      />

      <button onClick={getWeatherByCity}>Search</button>
    </div>
  );
}
