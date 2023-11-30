import styles from '../../../style';
import { BarChart, CustomSelectComponent, Footer, LineChart, Navbar } from '../../../components';
import { useSelector } from 'react-redux';
import { selectFullAccess } from '../../../redux/features/auth/authSlice';
import { privateNavLinks } from '../../../constants';
import StatisticsHeader from './StatisticsHeader';
import { useEffect, useState } from 'react';
import {
  toMonthStatisticsSelectMapper,
  toYearStatisticsSelectMapper,
} from '../../../redux/features/statistics/StatisticsMapper';
import {
  useGetIncomeStatisticsMutation,
  useGetMonthStatisticsMutation,
  useGetReservationStatisticsMutation,
  useGetReservedRoomStatisticsMutation,
  useGetRoomTypeStatisticsMutation,
  useGetSummaryStatisticsMutation,
  useGetUserStatisticsMutation,
  useGetYearStatisticsMutation,
} from '../../../redux/api/statisticsApiSlice';

const StatisticsPage = () => {
  const fullAccess = useSelector(selectFullAccess);
  const navConfig = {
    page: 'Statistics',
    isToggled: true,
    navbarLinks: privateNavLinks,
    logoWhite: true,
    textWhite: true,
    fullAccess: fullAccess,
  };

  const [getYearStatistics] = useGetYearStatisticsMutation();
  const [getMonthStatistics] = useGetMonthStatisticsMutation();
  const [getSummaryStatistics] = useGetSummaryStatisticsMutation();
  const [getRoomTypeStatistics] = useGetRoomTypeStatisticsMutation();
  const [getUserStatistics] = useGetUserStatisticsMutation();
  const [getReservationStatistics] = useGetReservationStatisticsMutation();
  const [getReservedRoomStatistics] = useGetReservedRoomStatisticsMutation();
  const [getIncomeStatistics] = useGetIncomeStatisticsMutation();

  const [form, setForm] = useState({
    year: {
      name: 'year',
      label: 'Year',
      value: { value: new Date().getFullYear(), label: new Date().getFullYear() },
      options: [],
    },
    month: {
      name: 'month',
      label: 'Month',
      value: { value: 0, label: 'None' },
      options: [],
    },
  });

  const getChartByName = (name) => {
    return chartApiList.find((chart) => chart.name === name);
  };

  const chartApiList = [
    {
      name: 'summary',
      api: async ({ year, month }) => await getSummaryStatistics({ year, month }),
    },
    {
      name: 'room-types',
      api: async ({ year, month }) => await getRoomTypeStatistics({ year, month }),
    },
    {
      name: 'users',
      label: 'Users',
      api: async ({ year, month }) => await getUserStatistics({ year, month }),
    },
    {
      name: 'reservations',
      label: 'Reservations',
      api: async ({ year, month }) => await getReservationStatistics({ year, month }),
    },
    {
      name: 'reserved-rooms',
      label: 'Reserved rooms',
      api: async ({ year, month }) => await getReservedRoomStatistics({ year, month }),
    },
    {
      name: 'income',
      label: 'Income',
      api: async ({ year, month }) => await getIncomeStatistics({ year, month }),
    },
  ];

  useEffect(() => {
    const loadYearMonthList = async () => {
      try {
        const responseYear = await getYearStatistics();
        const responseMonth = await getMonthStatistics();
        setForm({
          ...form,
          year: { ...form.year, options: toYearStatisticsSelectMapper(responseYear.data) },
          month: { ...form.month, options: toMonthStatisticsSelectMapper(responseMonth.data) },
        });
      } catch {
        console.log(`Failed to load year month list`);
      }
    };

    loadYearMonthList().then(() => console.log(`Year month list successfully loaded`));
  }, []);

  const onInputChange = (name, value) => {
    const result = Object.values(form).find((input) => input.name === name);
    setForm({
      ...form,
      [name]: { ...result, value: value },
    });
  };

  return (
    <div className={`${styles.page}`}>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar {...navConfig} />
        </div>
      </div>
      <div className="flex flex-col w-full items-center justify-center mt-8">
        <div
          className={
            'flex flex-col items-center text-center sm:text-start sm:items-start justify-center w-[70%] gap-16'
          }>
          <p
            className={`flex flex-col gap-2 text-sm text-dimWhite font-poppins font-thin leading-10 sm:leading-8`}>
            <span className={'text-2xl font-semibold text-white leading-[50px] sm:leading-8'}>
              Your Statistics
            </span>
            <span>
              Welcome to the Statistics Page, where you can gain valuable insights into your
              property's performance. Explore key metrics and trends to make informed decisions.
            </span>
          </p>
          <div
            className={`w-full flex flex-col sm:flex-row text-start items-center justify-between gap-10`}>
            <CustomSelectComponent
              attributes={form.year}
              onChange={(newValue) => onInputChange(form.year.name, newValue)}
              label={true}
              multi={false}
              width={'w-full'}
            />
            <CustomSelectComponent
              attributes={form.month}
              onChange={(newValue) => onInputChange(form.month.name, newValue)}
              label={true}
              multi={false}
              width={'w-full'}
            />
          </div>
          <StatisticsHeader
            year={form.year.value.value}
            month={form.month.value.value}
            title={'Summary statistics'}
            description={
              'Pie Chart showing the distribution of reserved rooms among different room types.'
            }
            apiList={[getChartByName('summary'), getChartByName('room-types')]}
          />
          <LineChart
            year={form.year.value.value}
            month={form.month.value.value}
            title={'Users statistics'}
            description={
              'Line chart displaying number of new users each month or each day in month.'
            }
            apiList={[getChartByName('users')]}
          />
          <LineChart
            year={form.year.value.value}
            month={form.month.value.value}
            title={'Reservations and reserved rooms statistics'}
            description={
              'Line chart displaying number of reservations and reserved rooms each month or each day in month.'
            }
            apiList={[getChartByName('reservations'), getChartByName('reserved-rooms')]}
          />
          <BarChart
            year={form.year.value.value}
            month={form.month.value.value}
            title={'Income statistics'}
            description={
              'Line chart displaying total cost of created payments each month or each day in month.'
            }
            apiList={[getChartByName('income')]}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StatisticsPage;
