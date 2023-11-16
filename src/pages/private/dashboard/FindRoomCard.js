import styles from '../../../style';

const FindRoomCard = () => {
  return (
    <div
      key={`dashboard-find-room-card`}
      className="bg-black-gradient flex flex-col items-center sm:items-start justify-center gap-4 box-shadow p-8 rounded-[10px]">
      <div className="flex flex-col text-center sm:text-start justify-between w-full">
        <p
          className={`flex flex-col text-sm text-dimWhite font-poppins font-thin leading-10 sm:leading-8 gap-5`}>
          <span className={'text-3xl font-semibold text-white leading-[50px] sm:leading-8'}>
            Book your dream room
          </span>
          <span>
            Discover a world of comfort, luxury, and relaxation at Diamond hotel. Our doors are
            open, and we're ready to make your stay unforgettable.
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
