import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useEffect, useState } from 'react';
import { CustomLoadingOverlayNotFixed } from '../index';

const LineChart = ({ year, month, apiList, title, description }) => {
  const [loading, setLoading] = useState(false);
  const [lineData, setLineData] = useState({
    labels: [],
    datasets: [],
  });
  const colors = ['#796f44', '#f8efd4'];

  useEffect(() => {
    const loadLineChartData = async () => {
      setLoading(true);
      const filters = { year, month };
      let newLineData = {
        labels: [],
        datasets: [],
      };
      apiList.forEach(({ api, label }, index) => {
        api(filters)
          .then((response) => {
            if (index === 0) {
              newLineData.labels = response.data.data?.map((obj) => obj.x);
            }
            newLineData.datasets = [
              ...newLineData.datasets,
              {
                label: label,
                data: [...response.data.data?.map((obj) => obj.y)],
                borderWidth: 2,
                borderColor: colors[index % colors.length],
                backgroundColor: colors[index % colors.length],
              },
            ];
            if (index === apiList.length - 1) {
              setLineData(newLineData);
              setLoading(false);
            }
          })
          .catch(() => console.log(`Failed to load ${label ?? 'statistics'}`));
      });
    };

    loadLineChartData().then(() => console.log(`Loaded ${title ?? 'statistics'}`));
  }, [year, month]);

  return (
    <div
      key={`line-chart-${apiList.map(({ name }, index) =>
        index !== apiList?.length - 1 ? name + '-' : name
      )}-${year}-${month}`}
      className={`w-full`}>
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
          <Line
            data={lineData}
            options={{
              color: '#FFFFFF',
              responsive: true,
              plugins: { legend: { display: false } },
              elements: { point: { borderWidth: 1 } },
              scales: {
                y: {
                  min: 0,
                  grid: { color: 'rgba(255,255,255,0.05)' },
                  ticks: { color: '#FFFFFF', beginAtZero: false },
                },
                x: {
                  grid: { color: 'rgba(255,255,255,0.05)' },
                  ticks: { color: '#FFFFFF', beginAtZero: false },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default LineChart;
