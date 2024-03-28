import React from "react";
import WeatherCard from "./WeatherCard";
import InputForCity from "./InputForCity";

const Index = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <InputForCity />
      <WeatherCard />
    </div>
  );
};

export default Index;
