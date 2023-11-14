import { useState } from 'react';
import { inputsInfo } from '../../../constants';
import { toRoomTypeSelectMapper } from '../../../redux/features/roomType/roomTypeMapper';
import { useSelector } from 'react-redux';
import { selectRoomTypeList } from '../../../redux/features/roomType/roomTypeSlice';
import { CustomSelectComponent, CustomStandardInput } from '../../../components';
import styles from '../../../style';
import { toast } from 'react-toastify';
import { toAddRoomRequestMapper } from '../../../redux/features/room/roomMapper';
import { useCreateRoomMutation } from '../../../redux/api/roomApiSlice';

const AddRoomForm = () => {
  const roomTypeList = useSelector(selectRoomTypeList);
  const [form, setForm] = useState({
    number: {
      ...inputsInfo.room.number,
      value: 1,
    },
    floor: {
      ...inputsInfo.room.floor,
      value: 1,
    },
    roomTypeName: {
      ...inputsInfo.roomType.names,
      name: 'roomTypeName',
      label: 'Room Type Name',
      value: '',
      options: toRoomTypeSelectMapper(roomTypeList),
    },
  });
  const [createRoom] = useCreateRoomMutation();

  const onInputChange = (name, value) => {
    const result = Object.values(form).find((input) => input.name === name);
    if (result.type === 'number' && value < 1) {
      return;
    }

    setForm({
      ...form,
      [name]: { ...result, value: value ?? new Date() },
    });
  };

  const addRoomOnClick = async (e) => {
    e.preventDefault();

    try {
      const response = await createRoom(toAddRoomRequestMapper(form)).unwrap();
      toast.success(`Room ${response.number} added or updated successfully`);
      setTimeout(() => window.location.reload(), 3 * 1000);
    } catch (e) {
      toast.error('Failed to add room with provided details');
    }
  };

  return (
    <div key={`add-room-form`} className={`w-full flex flex-wrap gap-5 py-8`}>
      <p
        className={`flex flex-col gap-2 text-sm text-dimWhite font-poppins font-thin leading-10 sm:leading-8`}>
        <span className={'text-2xl font-semibold text-white leading-[50px] sm:leading-8'}>
          Room
        </span>
        <span>
          Save and Make it Live: By clicking "Add room" you are adding the new room to your
          property's inventory or updating existing room. Make it live to showcase it to potential
          guests.
        </span>
      </p>
      <div className={`w-full flex flex-wrap justify-between gap-5 sm:gap-0 text-start`}>
        {Object.values(form)
          .filter((obj) => obj.name !== 'roomTypeName')
          .map((obj) => (
            <CustomStandardInput
              attributes={obj}
              onChange={(e) => onInputChange(e.target.name, e.target.value)}
              label={true}
              customStyles={`w-full sm:w-[30%]`}
            />
          ))}
        <CustomSelectComponent
          attributes={form.roomTypeName}
          onChange={(newValue) => onInputChange(form.roomTypeName.name, newValue)}
          label={true}
          multi={false}
          width={'w-full sm:w-[30%]'}
        />
      </div>
      <button className={`${styles.button} w-full sm:w-auto`} onClick={addRoomOnClick}>
        Add room
      </button>
    </div>
  );
};

export default AddRoomForm;
