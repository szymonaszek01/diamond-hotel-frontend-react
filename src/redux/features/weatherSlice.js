export const toWeatherListMapper = (res) => {
  return res.weather_list.map(obj => {
    return {
      id: obj.id,
      measuredAt: obj.measured_at,
      main: obj.main,
      description: obj.description,
      icon: obj.icon,
      measurementList: obj.measurement_list
    }
  })
}