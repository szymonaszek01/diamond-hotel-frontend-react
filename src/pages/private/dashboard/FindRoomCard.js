import styles from '../../../style';

const FindRoomCard = () => {
  return (
    <div
      key={`dashboard-find-room-card`}
      className="flex flex-col items-center sm:items-start justify-center gap-4 rounded-[5px]">
      <div className="flex flex-col text-center sm:text-start justify-between w-full">
        <p
          className={`flex flex-col text-sm text-dimWhite font-poppins font-thin leading-10 sm:leading-8 gap-5`}>
          <span className={'text-3xl font-semibold text-white leading-[50px] sm:leading-8'}>
            Book your dream room
          </span>
          <span>
            Diamond hotel is famous for comfort, luxury, and relaxation. Don't waste a time and book
            your dream room now. We are sure that you will spend marvellous holiday in our resort.
          </span>
        </p>
      </div>
      <a
        href="/find-room"
        className={`${styles.button} items-center text-center box-shadow text-sm p-3 box-shadow`}>
        Book a room
      </a>
    </div>
  );
};

export default FindRoomCard;
