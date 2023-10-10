export const toWeatherListMapper = (res) => {
  const { weather_list } = res;
  return weather_list.map((weather) => {
    const { id, measured_at, main, description, icon, measurement_list } = weather;
    return {
      id: id,
      measuredAt: measured_at,
      main: main,
      description: description,
      icon: icon,
      measurementList: measurement_list,
    };
  });
};
