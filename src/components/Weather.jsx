import { useEffect, useRef, useState } from "react";
import "./Weather.css";

export default function Weather() {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  //   const allIcons = {
  //     "01d": clear_icon,
  //     "01n": clear_icon,
  //     "02d": cloud_icon,
  //     "02n": cloud_icon,
  //     "03d": cloud_icon,
  //     "03n": cloud_icon,
  //     "04d": drizzle_icon,
  //     "04n": drizzle_icon,
  //     "09d": rain_icon,
  //     "09n": rain_icon,
  //     "10d": rain_icon,
  //     "10n": rain_icon,
  //     "13d": snow_icon,
  //     "13n": snow_icon,
  //   };

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      //   const icon = allIcons[data.Weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        // icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.log(error);
    }
  };

  useEffect(() => {
    search("Tehran");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="search" />
        <i
          className="bi bi-search"
          onClick={() => search(inputRef.current.value)}
        ></i>
      </div>

      {weatherData ? (
        <>
          <i className="bi bi-sun-fill weather-icon"></i>
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <i className="bi bi-moisture"></i>
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <i className="bi bi-wind"></i>
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
