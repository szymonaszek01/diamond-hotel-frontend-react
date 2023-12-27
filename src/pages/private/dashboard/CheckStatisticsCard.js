import styles from '../../../style';

const CheckStatisticsCard = () => {
  return (
    <div
      key={`check-statistics-card`}
      className="flex flex-col items-center sm:items-start justify-center gap-4">
      <div className="flex flex-col text-center sm:text-start justify-between w-full">
        <p
          className={`flex flex-col text-sm text-dimWhite font-poppins font-thin leading-10 sm:leading-8 gap-5`}>
          <span className={'text-3xl font-semibold text-white leading-[50px] sm:leading-8'}>
            Check statistics
          </span>
          <span>
            Check our comprehensive and various statistics to gain valuable feedback. Be aware of
            your hotel condition and crete new investments based on available data.
          </span>
        </p>
      </div>
      <a
        href="/statistics"
        className={`${styles.button} items-center text-center box-shadow text-sm p-3 box-shadow`}>
        Get started
      </a>
    </div>
  );
};

export default CheckStatisticsCard;
