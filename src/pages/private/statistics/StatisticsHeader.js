import { CustomLoadingOverlayNotFixed, CustomTagWithLabel, PieChart } from '../../../components';
import { useEffect, useState } from 'react';

const StatisticsHeader = ({ year, month, apiList, title, description }) => {
  const [loading, setLoading] = useState(false);
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    const loadSummaryData = async () => {
      setLoading(true);
      const filters = { year, month };
      apiList
        .find((api) => api.name === 'summary')
        ?.api(filters)
        .then((response) => {
          setSummaryData(response.data.data);
          setLoading(false);
        })
        .catch(() => console.log(`Failed to load summary`));
    };

    loadSummaryData().then(() => console.log('Loaded summary'));
  }, [year, month]);

  return (
    <div key={`statistics-header-${year}-${month ?? ''}`} className={`w-full`}>
      <p
        className={`flex flex-col gap-2 text-sm text-dimWhite font-poppins font-thin leading-10 sm:leading-8`}>
        <span className={'text-2xl font-semibold text-white leading-[50px] sm:leading-8'}>
          {title}
        </span>
        <span>{description}</span>
      </p>
      <div className={`w-full flex flex-col sm:flex-row items-start mt-6`}>
        <div className={`flex w-full flex-col sm:flex-row justify-between items-start`}>
          <div className={`w-full sm:w-[40%] ${loading ? '' : 'sm:mt-3'}`}>
            {loading ? (
              <CustomLoadingOverlayNotFixed message={'Loading statistics...'} />
            ) : (
              <div className={`w-full flex flex-col gap-5`}>
                {summaryData?.map((obj) => (
                  <CustomTagWithLabel
                    name={obj.x}
                    label={obj.x}
                    value={obj.x === 'Income' ? obj.y + ' $' : obj.y}
                    valueStyle={`text-base text-white font-semibold`}
                    labelStyle={`text-sm text-gradient`}
                    styles={'border-[1px] border-white rounded-[3px]'}
                  />
                ))}
              </div>
            )}
          </div>
          <div className={`w-full sm:w-[40%] flex flex-col`}>
            <PieChart
              year={year}
              month={month}
              apiList={apiList.filter((api) => api.name !== 'summary')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsHeader;
