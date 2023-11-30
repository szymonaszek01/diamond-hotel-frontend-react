import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { useEffect, useState } from 'react';
import { CustomLoadingOverlayNotFixed } from '../index';

const PieChart = ({ year, month, apiList, title, description }) => {
  const [loading, setLoading] = useState(false);
  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [],
  });
  const colors = ['#413b21', '#796f44', '#d0bf79', '#eee0b2', '#f8efd4'];

  useEffect(() => {
    const loadPieData = async () => {
      setLoading(true);
      const filters = { year, month };
      let newPieData = {
        labels: [],
        datasets: [],
      };

      apiList.forEach(({ api, label }, index) => {
        api(filters)
          .then((response) => {
            if (index === 0) {
              newPieData.labels = response.data.data?.map((obj) => obj.x);
            }
            newPieData.datasets = [
              ...newPieData.datasets,
              {
                label: label,
                data: [...response.data.data?.map((obj) => obj.y)],
                hoverOffset: 4,
                backgroundColor: Array.from({ length: response.data.data.length }, (x, i) =>
                  colors.at(i % colors.length)
                ),
              },
            ];
            if (index === apiList.length - 1) {
              setPieData(newPieData);
              setLoading(false);
            }
          })
          .catch(() => console.log(`Failed to load ${label ?? 'statistics'}`));
      });
    };

    loadPieData().then(() => console.log(`Loaded ${title ?? 'statistics'}`));
  }, [year, month]);

  return (
    <div
      key={`pie-chart-${apiList.map(({ name }, index) =>
        index !== apiList?.length - 1 ? name + '-' : name
      )}-${year}-${month}`}
      className={`w-full mt-6 sm:mt-0`}>
      {loading ? (
        <CustomLoadingOverlayNotFixed message={'Loading statistics...'} />
      ) : (
        <div className={`w-full flex flex-col gap-8`}>
          <p
            className={`${
              title && description ? '' : 'hidden'
            } flex flex-col gap-2 text-sm text-dimWhite font-poppins font-thin leading-10 sm:leading-8`}>
            <span className={'text-2xl font-semibold text-white leading-[50px] sm:leading-8'}>
              {title}
            </span>
            <span>{description}</span>
          </p>
          <Pie data={pieData} options={{ offset: 15, color: '#FFFFFF' }} />
        </div>
      )}
    </div>
  );
};

export default PieChart;
