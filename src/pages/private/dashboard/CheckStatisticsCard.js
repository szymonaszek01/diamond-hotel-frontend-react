import styles from '../../../style';

const CheckStatisticsCard = () => {
  return (
    <div
      key={`check-statistics-card`}
      className="bg-black-gradient flex flex-col items-center sm:items-start justify-center gap-4 box-shadow p-8 rounded-[10px]">
      <div className="flex flex-col text-center sm:text-start justify-between w-full">
        <p
          className={`flex flex-col text-sm text-dimWhite font-poppins font-thin leading-10 sm:leading-8 gap-5`}>
          <span className={'text-3xl font-semibold text-white leading-[50px] sm:leading-8'}>
            Check statistics
          </span>
          <span>
            Curious about how well your property is doing? Dive into our comprehensive statistics to
            gain valuable insights.
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
