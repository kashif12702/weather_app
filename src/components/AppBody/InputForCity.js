import React from "react";
import { IoSearch } from "react-icons/io5";
import { useWeatherContext } from "../../context/weather";

const InputForCity = () => {
  const { city, setCity, getWeatherByCity } = useWeatherContext();
  const searchHandle = () => {
    if (city === "current") {
      setCity(null);
    } else {
      getWeatherByCity();
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchHandle();
    }
  };
  return (
    <div className="relative w-64 md:w-96 mb-4 sm:mb-10">
      <label htmlFor="Search" className="sr-only">
        Search
      </label>

      <input
        type="text"
        id="Search"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search for City"
        className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
      />

      <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
        <button
          onClick={() => searchHandle()}
          type="button"
          className="text-gray-600 hover:text-gray-700"
        >
          <span className="sr-only">Search</span>
          <IoSearch />
        </button>
      </span>
    </div>
  );
};

export default InputForCity;
