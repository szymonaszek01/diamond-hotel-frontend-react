import styles from '../../../style';

const AddRoomCard = () => {
  return (
    <div
      key={`dashboard-add-room-card`}
      className="bg-black-gradient flex flex-col items-center sm:items-start justify-center gap-4 box-shadow p-8 rounded-[10px]">
      <div className="flex flex-col text-center sm:text-start justify-between w-full">
        <p
          className={`flex flex-col text-sm text-dimWhite font-poppins font-thin leading-10 sm:leading-8 gap-5`}>
          <span className={'text-3xl font-semibold text-white leading-[50px] sm:leading-8'}>
            Add a New Room or Room Type
          </span>
          <span>
            Ready to attract more guests and boost revenue? Consider adding a new room or room type
            today! More rooms mean more bookings and increased revenue potential.
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
