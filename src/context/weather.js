import React, { createContext, useContext, useState, useEffect } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [allowLocation, setAllowLocation] = useState(false);

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
        setError(true);
      }
      let data = await response.json();
      setWeather(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    setError(false);
    setAllowLocation(true);
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      setLoading(true);
      let response = await fetch(url);

      if (!response.ok) {
        setError(true);
      }

      let data = await response.json();
      setWeather(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const locationAlert = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setAllowLocation(true);
        },
        (error) => {
          setAllowLocation(false);
        }
      );
    } else {
      // Geolocation not supported by browser
      alert("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    locationAlert();
    getCurrentLocation();

    // eslint-disable-next-line
  }, []);

  const allValues = {
    weather,
    city,
    setCity,
    loading,
    error,
    allowLocation,
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
