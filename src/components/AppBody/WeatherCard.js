import dayjs from "dayjs";
import React from "react";
import { useWeatherContext } from "../../context/weather";
import { BsThermometerLow } from "react-icons/bs";
import { MdWaterDrop } from "react-icons/md";
import { MdAir } from "react-icons/md";
import Loader from "../Loader";
import { BiSolidError } from "react-icons/bi";

const WeatherCard = () => {
  const {
    weather: weatherData,
    loading,
    error,
    allowLocation,
  } = useWeatherContext();

  const IconWithText = ({ Icon, text }) => {
    return (
      <div className="flex items-center justify-between gap-3 text-gray-200 bg-[#506079] px-3 py-2 rounded-full">
        <Icon className="w-5 h-5" />
        <p className="text-sm sm:text-base font-medium">{text}</p>
      </div>
    );
  };

  const ErrorMessage = ({ title }) => {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <BiSolidError className="text-[#405068] text-5xl font-semibold" />
        <p className="capitalize max-w-80 text-center">{title}</p>
      </div>
    );
  };

  if (loading) return <Loader />;
  if (!allowLocation) {
    return (
      <ErrorMessage
        title={
          "Please allow access to your location for this app to work properly."
        }
      />
    );
  }
  return (
    <>
      {error ? (
        <ErrorMessage
          title={weatherData.message || "Error occurred While fetching data"}
        />
      ) : (
        <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg p-4 sm:p-6 mx-4 rounded-xl shadow-md">
          <div className="flex flex-col-reverse sm:flex-row justify-between mb-4">
            <div>
              <div className="text-center sm:text-left">
                <p className="text-base font-semibold text-gray-800">Today</p>
                <p className="text-xl font-bold text-gray-800">
                  {dayjs().format("MMMM DD, YYYY")}
                </p>
              </div>
              <div className="uppercase tracking-wide text-center sm:text-left text-sm first-letter:font-semibold my-3">
                <p className="text-2xl md:text-3xl font-bold text-gray-800">
                  {weatherData?.name}, {weatherData?.sys.country}
                </p>
              </div>
            </div>
            <div className=" flex flex-col justify-center items-center mb-4 sm:mb-0">
              <img
                className="w-28 h-16 object-cover"
                src={`http://openweathermap.org/img/wn/${weatherData?.weather[0].icon.replace(
                  "n",
                  "d"
                )}@4x.png`}
                alt={weatherData?.weather[0].description}
              />
              <p className="text-center sm:text-left text-lg text-gray-800">
                {weatherData?.weather[0].main}
              </p>
            </div>
          </div>
          <div className="bg-[#9CDEF5] p-4 rounded-lg flex flex-wrap justify-center gap-4 md:gap-6">
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
