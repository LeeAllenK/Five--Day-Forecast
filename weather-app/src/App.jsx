import {useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { WeatherCard } from './components/WeatherCard'
import { DefaultCard } from './components/DefaultCard'

export default function App() {
  const [geoData, setGeoData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [info, setInfo] = useState({
    sunrise: '',
    sunset: '',
    sunriseGeo: '',
    sunsetGeo: ''
  });
  const [forecastGeo, setForecastGeo] = useState([]);
  const [forecastCity, setForecastCity] = useState([]);
  const apiKeyCity = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_CITY_API_KEY}`
  const apiKey = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${import.meta.env.VITE_CITY_API_KEY}`
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    async function getLocation() {
      try {
        const res = await fetch(apiKey);
        const data = await res.json();

        const fiveDay = data.list.filter((d, i) => i % 8 === 0)
        const sunRise = new Date(data?.city?.sunrise * 1000).toLocaleTimeString('en-US')
        const sunSet = new Date(data?.city?.sunset * 1000).toLocaleTimeString('en-US')
        setGeoData(data);
        setForecastGeo(fiveDay)
        setInfo({
          sunriseGeo: sunRise,
          sunsetGeo: sunSet
        })
      } catch(err) {
        return err;
      }
    }
    getLocation()
  }, [lat, long])
  useEffect(() => {
    const getWeather = async () => {
      try {
        const res = await fetch(apiKeyCity);
        const data = await res.json();
        const sunRise = new Date(data?.city?.sunrise * 1000).toLocaleTimeString('en-US')
        const sunSet = new Date(data?.city?.sunset * 1000).toLocaleTimeString('en-US')
        const fiveDay = data?.list?.filter((d, i) => i % 8 === 0)

        if(!data || !Array.isArray(fiveDay)) {
          console.error("Data is missing or not an array");
          return null;
        }
        setWeatherData(data);
        setInfo({
          sunrise: sunRise,
          sunset: sunSet
        })
        setForecastCity(fiveDay)
        console.log(fiveDay)
        console.log(data)
      } catch(err) {
        return err;
      }
    }
    getWeather()
  }, [city])

  function handleCity() {
    if(locationInput) {
      setCity(locationInput);
    } else {
      console.error("Invalid location input. Please enter 'City, State, Country'.");
    }
  }
  const changeToFah = (k) => {
    if(k > 0) {
      return Math.floor(((k - 273.15) * 9 / 5) + 32);
    }
  }
  return (
    <div className='grid grid-cols-1 grid-rows-2 place-items-center  w-full max-w-full h-full m-h-full dark:bg-gray-800 '>
      {city.length > 0 ? (
        <>
            <WeatherCard
              classNameWeather='grid  w-full h-full place-items-center rounded-xl gap-1 lg:text-4xl'
              locationInput={locationInput}
              setLocationInput={setLocationInput}
              onClick={handleCity}
              name={weatherData?.city?.name || geoData?.city?.name || 'Unknown Location'}
              description={weatherData?.list?.[0]?.weather?.[0]?.description || geoData?.list?.[0]?.weather?.[0]?.description || 'No data available'}
              temp={changeToFah(weatherData?.list?.[0]?.main?.temp) || changeToFah(geoData?.list?.[0]?.main?.temp) || '--'}
              tempHi={changeToFah(weatherData?.list?.[0]?.main?.temp_max) || changeToFah(geoData?.list?.[0]?.main?.temp_max) || '--'}
              tempLo={changeToFah(weatherData?.list?.[0]?.main?.temp_min) || changeToFah(geoData?.list?.[0]?.main?.temp_min) || '--'}
              sunrise={info.sunrise || info.sunriseGeo || 'N/A'}
              sunset={info.sunset || info.sunsetGeo || 'N/A'}
              day={dayjs().format('dddd')}
              date={dayjs().format('MMM DD, YYYY')}
              icon={`http://openweathermap.org/img/w/${weatherData?.list?.[0]?.weather?.[0]?.icon || geoData?.list?.[0]?.weather?.[0]?.icon || ''}.png`}
            />
        </>
      ) : (
        <>
          <WeatherCard
            classNameWeather='grid w-full h-full place-items-center lg:text-4xl'
            locationInput={locationInput}
            setLocationInput={setLocationInput}
            onClick={handleCity}
            name={weatherData?.city?.name || geoData?.city?.name || 'Unknown Location'}
            description={weatherData?.list?.[0]?.weather?.[0]?.description || geoData?.list?.[0]?.weather?.[0]?.description || 'No data available'}
            temp={changeToFah(weatherData?.list?.[0]?.main?.temp) || changeToFah(geoData?.list?.[0]?.main?.temp) || '--'}
            tempHi={changeToFah(weatherData?.list?.[0]?.main?.temp_max) || changeToFah(geoData?.list?.[0]?.main?.temp_max) || '--'}
            tempLo={changeToFah(weatherData?.list?.[0]?.main?.temp_min) || changeToFah(geoData?.list?.[0]?.main?.temp_min) || '--'}
            sunrise={info.sunrise || info.sunriseGeo || 'N/A'}
            sunset={info.sunset || info.sunsetGeo || 'N/A'}
            day={dayjs().format('dddd')}
            date={dayjs().format('MMM DD, YYYY')}
            icon={`http://openweathermap.org/img/w/${weatherData?.list?.[0]?.weather?.[0]?.icon || geoData?.list?.[0]?.weather?.[0]?.icon || ''}.png`}
          />
        </>
      )}
      <section className='grid w-[90%] h-[95%] border-1 rounded-3xl  bg-linear-to-b from-[#8cb4e8] to-[#122845]'>
        <div className='grid grid-cols-5 w-full h-full  ' >
          {forecastGeo.length ? (
            forecastGeo.map((f, i) => (
              <DefaultCard
                className='grid w-full h-full place-items-center place-content-around justify-center lg:text-4xl md:text-xl sm:text-sm text-xs '
                key={i}
                day={dayjs(f.dt_txt).format('dddd')} // Using Day.js for formatting
                description={f.weather[0]?.description || ''}
                icon={`http://openweathermap.org/img/w/${f.weather[0]?.icon || ''}.png`}
                temp={changeToFah(f.main.temp)}
                tempHi={changeToFah(f.main.temp_max)}
                tempLo={changeToFah(f.main.temp_min)}
              />
            ))
          ) : forecastCity.length ? (
            forecastCity.map((f, i) => (
              <DefaultCard
                className='grid w-full h-full place-items-center place-content-between justify-center lg:text-4xl  md:text-xl '
                key={i}
                day={dayjs(f.dt_txt).format('dddd')} // Using Day.js here too
                description={f.weather[0]?.description || ''}
                icon={`http://openweathermap.org/img/w/${f.weather[0]?.icon || ''}.png`}
                temp={changeToFah(f.main.temp)}
                tempHi={changeToFah(f.main.temp_max)}
                tempLo={changeToFah(f.main.temp_min)}
              />
            ))
          ) : !forecastGeo.length && !forecastCity.length && (
            Array(5).fill().map((_, i) => (
              <DefaultCard
                className='grid w-full h-full place-items-center place-content-between  justify-center lg:text-4xl md:text-xl'
                key={i}
                day="N/A"
                description="N/A"
                icon="/default-weather-icon.png"
                temp="--"
                tempHi="--"
                tempLo="--"
              />
            ))
          )}
        </div>
      </section>
    </div>
  )
}