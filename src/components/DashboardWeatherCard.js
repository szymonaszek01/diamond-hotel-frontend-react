import {useEffect, useState} from "react";
import styles from "../style";
import {ToastContainer} from "react-toastify";
import {measurement} from "../constants";
import {toWeatherListMapper} from "../redux/features/weatherSlice";
import {useGetWeatherListMutation} from "../redux/api/weatherApiSlice";
import {CustomLoadingOverlay} from "./index";
import {arrowRightWhite} from "../assets";
import {motion} from "framer-motion"

const MeasurementItem = ({obj, precision}) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <p
        className="font-poppins font-thin text-gradient text-xs">{obj?.label}</p>
      <p
        className="font-poppins font-bold text-white text-sm">{obj?.value.toFixed(precision)} {obj?.unit}</p>
    </div>
  )
}

const SelectedWeatherItem = ({weather, index}) => {
  const getMeasurementByName = (name) => {
    return weather?.measurementList?.find(measurement => measurement.name === name)
  }

  return (
    <motion.div key={`weather-${index}`} initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.8, delay: 0.5, ease: [0, 0.71, 0.2, 1.01]}}
                className="flex flex-col lg:flex-row px-5 pt-5 justify-between">
      <div className="flex flex-col items-center lg:items-start">
        <p
          className="font-poppins font-bold text-white text-sm">Maldives, Malé Atoll</p>
        <p
          className="font-poppins font-thin text-gradient text-xs">{new Date(weather?.measuredAt ?? Date.now()).toLocaleDateString()}</p>
        <div className="flex flex-row items-center gap-5">
          <div className="flex flex-col">
            <h2
              className="font-poppins text-white text-6xl font-thin">{getMeasurementByName(measurement.temperatureDay)?.value.toFixed(0)}{getMeasurementByName(measurement.temperatureDay)?.unit}</h2>
            <p className="font-poppins font-thin text-gradient text-xs mt-2">At night:</p>
            <p
              className="font-poppins font-bold text-white text-sm mt-1">{getMeasurementByName(measurement.temperatureNight)?.value.toFixed(0)} {getMeasurementByName(measurement.temperatureNight)?.unit}</p>
          </div>
          <img src={weather?.icon} alt="close" className="w-[130px] h-auto"/>
        </div>
      </div>
      <div className="flex flex-col items-center lg:items-start">
        <p
          className="font-poppins font-bold text-white text-sm">{weather?.description?.charAt(0).toUpperCase() + weather?.description?.slice(1)}</p>
        <div className="flex flex-row mt-3">
          <div className="flex flex-col border-r-[1px] border-dotted pr-6 gap-3">
            {<MeasurementItem obj={getMeasurementByName(measurement.humidity)} precision={0}/>}
            {<MeasurementItem obj={getMeasurementByName(measurement.wind)} precision={2}/>}
          </div>
          <div className="flex flex-col border-r-[1px] border-dotted px-6 gap-3">
            {<MeasurementItem obj={getMeasurementByName(measurement.pressure)} precision={0}/>}
            {<MeasurementItem obj={getMeasurementByName(measurement.clouds)} precision={0}/>}
          </div>
          <div className="flex flex-col pl-6 gap-3">
            {<MeasurementItem obj={getMeasurementByName(measurement.rain)} precision={2}/>}
            {<MeasurementItem obj={getMeasurementByName(measurement.uvi)} precision={2}/>}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const DailyWeatherItem = ({weather, index}) => {
  const getMeasurementByName = (name) => {
    return weather?.measurementList?.find(measurement => measurement.name === name)
  }

  return (
    <div
      className={`border-white border-[1px] lg:border-none relative flex flex-row lg:flex-col gap-2 rounded-[10px] p-4 items-center justify-center cursor-pointer ${index === 0 ? "bg-black-gradient" : "bg-[#00000018]"}`}>
      <p
        className="font-poppins font-bold text-white text-xs">{new Date(weather?.measuredAt ?? Date.now()).toLocaleDateString()}</p>
      <img src={weather?.icon} alt="close" className="w-[50px] h-auto"/>
      <p
        className="font-poppins font-thin text-white text-xs">{getMeasurementByName(measurement.temperatureDay)?.value.toFixed(0)} {getMeasurementByName(measurement.temperatureDay)?.unit}</p>
      <p
        className="font-poppins font-thin text-white text-xs">{getMeasurementByName(measurement.pressure)?.value.toFixed(0)} {getMeasurementByName(measurement.pressure)?.unit}</p>
      <p
        className="font-poppins font-thin text-white text-xs">{getMeasurementByName(measurement.wind)?.value.toFixed(2)} {getMeasurementByName(measurement.wind)?.unit}</p>
    </div>
  )
}

const DashboardWeatherCard = () => {
  const [getWeatherList, {isLoading}] = useGetWeatherListMutation()
  const [weatherList, setWeatherList] = useState([])
  const [selectedWeather, setSelectedWeather] = useState({
    weather: {},
    index: 0
  })

  const nextDailyWeather = () => {
    if (selectedWeather.index === 7) {
      return
    }
    const updatedIndex = selectedWeather.index + 1
    setSelectedWeather({...selectedWeather, weather: weatherList.at(updatedIndex), index: updatedIndex})
  }

  const previousDailyWeather = () => {
    if (selectedWeather.index === 0) {
      return
    }
    const updatedIndex = selectedWeather.index - 1
    setSelectedWeather({...selectedWeather, weather: weatherList.at(updatedIndex), index: updatedIndex})
  }

  useEffect(() => {
      const loadWeatherList = async () => {
        try {
          const response = await getWeatherList().unwrap()
          const mappedResponse = toWeatherListMapper(response)
          setWeatherList(mappedResponse)
          setSelectedWeather({...selectedWeather, weather: mappedResponse.at(0), index: 0})

        } catch (error) {
          console.log(error)
        }
      }

      loadWeatherList().then(() => console.log("Loaded weather list"))
    }, [getWeatherList]
  )

  return isLoading ? (<CustomLoadingOverlay message={"Loading..."}/>) : (
    <div className={`${styles.boxWidth}`}>
      <ToastContainer className={"toast-style"}/>
      <div className="relative bg-black-gradient rounded-[10px] box-shadow w-full mt-7">
        <SelectedWeatherItem weather={selectedWeather.weather} index={selectedWeather.index}/>
        <div className="flex flex-col lg:flex-row justify-between items-center mt-7 px-5 pb-5 w-full">
          <img src={arrowRightWhite} alt="close" className="h-[30px] w-auto rotate-[-90deg] lg:rotate-180 cursor-pointer mb-5 lg:mb-0"
               onClick={previousDailyWeather}/>
          <div className="relative flex flex-col lg:flex-row gap-7 w-[80%] h-[200px] lg:h-full overflow-y-hidden lg:overflow-x-hidden">
            {weatherList.slice(selectedWeather.index).map((weather, index) => <DailyWeatherItem weather={weather} index={index}/>)}
          </div>
          <img src={arrowRightWhite} alt="arrow" className="h-[30px] rotate-90 lg:rotate-0 w-auto cursor-pointer mt-5 lg:mt-0" onClick={nextDailyWeather}/>
        </div>
      </div>
    </div>
  )
}

export default DashboardWeatherCard