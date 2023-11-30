export const toYearStatisticsSelectMapper = (res) => {
  return res.map((obj) => {
    return {
      value: obj,
      label: obj,
    };
  });
};

export const toMonthStatisticsSelectMapper = (res) => {
  return res.map((obj, index) => {
    return {
      value: index,
      label: obj,
    };
  });
};
