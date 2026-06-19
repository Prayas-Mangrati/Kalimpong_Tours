import { useEffect, useState } from "react";

export default function Navbar({ cardsRef, searchPlace, setSearchPlace }) {
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
        setWeatherIcon(`https://openweathermap.org/img/wn/${iconCode}.png`);
      } catch (err) {
         showToast(
    "Couldn't fetch weather data. Please check your internet connection.",
    "error",
    "circle-xmark"
  );
        setWeatherMain("N/A");
        setWeatherTemp("N/A");
      }
    };

    loadWeather();
  }, [lat, lon, API_KEY]);

  const handleSearchClick = () => {
    cardsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="border-gradient">
      <div className="rounded-b-lg border-gradient-inner p-2 md:p-4 text-white">
        <div className="rounded-b-lg border-gradient-inner py-3 px-4 text-white">
          <div className="flex flex-col gap-4">
            <div className="hidden lg:flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  className="logo brand-text-glow shrink-0"
                  src="/kpg_tour_logo.png"
                  alt="Kalimpong Tours logo"
                />
                <a
                  href="#"
                  className="brand-text-glow whitespace-nowrap text-xl"
                >
                  Kalimpong Tours
                </a>
              </div>
              <div className="flex items-center gap-2">
                {weatherIcon && (
                  <img
                    className="h-8 w-8"
                    src={weatherIcon}
                    alt="Weather Icon"
                  />
                )}
                <span>
                  {weatherMain} ({weatherTemp}&deg;C)
                </span>
              </div>
              <div className="flex items-center">
                <div className="search-icon white-shadow h-9 border-2 border-white border-r-0 rounded-l-lg">
                  <i className="fa-solid fa-magnifying-glass text-white"></i>
                </div>

                <input
                  type="search"
                  placeholder="Enter to search..."
                  className="h-9 w-60 p-2 border-t-2 border-b-2 border-white outline-none white-shadow text-gray-800"
                  value={searchPlace}
                  onChange={(e) => setSearchPlace(e.target.value)}
                />

                <button
                  onClick={handleSearchClick}
                  className="h-9 px-3 border-2 border-white border-l-0 rounded-r-lg text-white white-shadow"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 lg:hidden">
              <div className="flex items-center gap-4">
                <img
                  className="logo brand-text-glow shrink-0"
                  src="/kpg_tour_logo.png"
                  alt="Kalimpong Tours logo"
                />

                <a
                  href="#"
                  className="brand-text-glow whitespace-nowrap text-xl"
                >
                  Kalimpong Tours
                </a>

                <div className="hidden sm:flex items-center gap-2">
                  {weatherIcon && (
                    <img
                      className="h-8 w-8"
                      src={weatherIcon}
                      alt="Weather Icon"
                    />
                  )}
                  <span>
                    {weatherMain} ({weatherTemp}&deg;C)
                  </span>
                </div>
              </div>

              <div className="flex items-center w-full justify-center">
                <div className="search-icon white-shadow h-9 border-2 border-white border-r-0 rounded-l-lg">
                  <i className="fa-solid fa-magnifying-glass text-white"></i>
                </div>

                <input
                  type="search"
                  placeholder="Enter to search..."
                  className="h-9 w-[60%] sm:w-72 p-2 border-t-2 border-b-2 border-white outline-none white-shadow text-gray-800"
                  value={searchPlace}
                  onChange={(e) => setSearchPlace(e.target.value)}
                />

                <button
                  onClick={handleSearchClick}
                  className="h-9 px-3 border-2 border-white border-l-0 rounded-r-lg text-white white-shadow"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
