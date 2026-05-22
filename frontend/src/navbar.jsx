import { useEffect, useState } from "react";

export default function Navbar({ searchPlace, setSearchPlace }) {
  const lat = 27.0667;
  const lon = 88.4667;
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const [weatherMain, setWeatherMain] = useState("Loading...");
  const [weatherTemp, setWeatherTemp] = useState("Loading...");
  const [weatherIcon, setWeatherIcon] = useState("");

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
        );
        const weatherResponse = await response.json();
        setWeatherMain(weatherResponse?.weather?.[0]?.main || "N/A");
        setWeatherTemp(weatherResponse?.main?.temp || "N/A");
        const iconCode = weatherResponse?.weather?.[0]?.icon;
        setWeatherIcon(`http://openweathermap.org/img/wn/${iconCode}.png`);
      } catch (err) {
        console.log("Weather API error", err);
        setWeatherMain("N/A");
        setWeatherTemp("N/A");
      }
    };

    loadWeather();
  }, [lat, lon, API_KEY]);

  return (
    <div className="border-gradient">
      <div className="rounded-b-lg border-gradient-inner p-4 text-white">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between gap-3 md:ml-10 md:justify-start">
            <div className="flex items-center gap-2 text-lg sm:text-xl">
              <img
                className="logo brand-text-glow shrink-0"
                src="/kpg_tour_logo.png"
                alt="Kalimpong Tours logo"
              />
              <a href="#" className="brand-text-glow whitespace-nowrap p-1">
                Kalimpong Tours
              </a>
            </div>

            <div className="flex items-center gap-2 text-sm sm:text-base md:hidden">
              {weatherIcon && (
                <img
                  className="h-8 w-8 shrink-0"
                  src={weatherIcon}
                  alt="Weather Icon"
                />
              )}
              <span className="whitespace-nowrap">
                {weatherMain} ({weatherTemp}&deg;C)
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 text-base">
            {weatherIcon && (
              <img
                className="h-10 w-10 shrink-0"
                src={weatherIcon}
                alt="Weather Icon"
              />
            )}
            <span className="whitespace-nowrap">
              {weatherMain} ({weatherTemp}&deg;C)
            </span>
          </div>

          <div className="flex gap-3 flex-row justify-center md:items-center md:gap-4 md:mr-5">
            <div className="flex items-center md:w-auto">
              <div className="search-icon white-shadow h-9 border-2 border-white border-r-0 rounded-l-lg">
                <i className="fa-solid fa-magnifying-glass text-white"></i>
              </div>
              <input
                type="search"
                placeholder="Enter to search..."
                className="h-9 min-w-0 w-full p-2 border-t-2 border-b-2 border-white outline-none white-shadow md:w-60 text-gray-800"
                value={searchPlace}
                onChange={(e) => setSearchPlace(e.target.value)}
              />
              <button className="h-9 px-3 border-2 border-white border-l-0 rounded-r-lg text-white white-shadow">
                Search
              </button>
            </div>
            {/* <button className="bg-red-500 border-2 text-white rounded p-1 white-shadow self-end md:self-auto">
              Logout
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
