import styles from '../../../style';

const AddRoomCard = () => {
  return (
    <div
      key={`dashboard-add-room-card`}
      className="flex flex-col items-center sm:items-start justify-center gap-4">
      <div className="flex flex-col text-center sm:text-start justify-between w-full">
        <p
          className={`flex flex-col text-sm text-dimWhite font-poppins font-thin leading-10 sm:leading-8 gap-5`}>
          <span className={'text-3xl font-semibold text-white leading-[50px] sm:leading-8'}>
            Add a New Room or Room Type
          </span>
          <span>
            If you want to increase the number of rooms or define a new room type, please click
            button below! More rooms mean more bookings and better income potential.
          </span>
        </p>
      </div>
      <a
        href="/add-room"
        className={`${styles.button} items-center text-center box-shadow text-sm p-3 box-shadow`}>
        Get started
      </a>
    </div>
  );
};

export default AddRoomCard;
