import React, { createContext, useContext, useState, useEffect } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const API_KEY = "dad1b5d24cb8a3a955122de319fa607e";

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };
  const getWeatherByCurrentLocation = async (lat, lon) => {
    setError(false);
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      if (!response.ok) {
        setError("Failed to fetch data");
      }
      let data = await response.json();
      setWeather(data);
    } catch (error) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    setError(false);
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      setLoading(true);
      let response = await fetch(url);

      if (!response.ok) {
        setError("Failed to fetch data");
      }

      let data = await response.json();
      setWeather(data);
    } catch (error) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCurrentLocation();
    // eslint-disable-next-line
  }, []);

  const allValues = {
    weather,
    city,
    setCity,
    loading,
    error,
    getWeatherByCity,
    getCurrentLocation,
  };
  return (
    <WeatherContext.Provider value={allValues}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => useContext(WeatherContext);
