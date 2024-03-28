import dayjs from "dayjs";
import React from "react";
import { useWeatherContext } from "../../context/weather";
import { BsThermometerLow } from "react-icons/bs";
import { MdWaterDrop } from "react-icons/md";
import { MdAir } from "react-icons/md";
import Loader from "../Loader";

const WeatherCard = () => {
  // const currentDate = dayjs().format("MMMM DD");
  const { weather: weatherData, loading, error } = useWeatherContext();
  console.log("weatherData", weatherData);

  const IconWithText = ({ Icon, text }) => {
    return (
      <div className="flex items-center justify-between gap-3 text-gray-200 bg-[#506079] px-3 py-2 rounded-full">
        <Icon className="w-5 h-5" />
        <p className="text-base font-medium">{text}</p>
      </div>
    );
  };

  if (loading) return <Loader />;
  return (
    <>
      {error ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-[#405068] text-5xl font-semibold">{weatherData.cod}</p>
          <p className="capitalize">{weatherData.message ? weatherData.message : "Error occurred While fetching data"}</p>
        </div>
      ) : (
        <div className="bg-[#405068] p-6 rounded-xl shadow-md">
          <div className="flex justify-between mb-4">
            <div>
              <div>
                <p className="text-base font-semibold text-gray-300">Today</p>
                <p className="text-xl font-bold text-gray-300">
                  {dayjs().format("MMMM DD, YYYY")}
                </p>
              </div>
              <div className="uppercase tracking-wide text-center text-sm first-letter:font-semibold mb-4">
                <p className="text-4xl text-left font-bold text-gray-300">
                  {weatherData?.name}, {weatherData?.sys.country}
                </p>
              </div>
            </div>
            <div className=" flex flex-col justify-center items-center">
              <img
                className="w-28 h-16 object-cover"
                src={`http://openweathermap.org/img/wn/${weatherData?.weather[0].icon.replace("n","d")}@4x.png`}
                alt={weatherData?.weather[0].description}
              />
              <p className="text-lg text-gray-200">
                {weatherData?.weather[0].main}
              </p>
            </div>
          </div>
          <div className="flex gap-4 md:gap-6">
            <IconWithText
              Icon={BsThermometerLow}
              text={weatherData?.main.temp + "°C"}
            />
            <IconWithText
              Icon={MdWaterDrop}
              text={weatherData?.main.humidity + "%"}
            />
            <IconWithText Icon={MdAir} text={weatherData?.main.temp + "°C"} />
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherCard;
