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
import { useNavigate } from 'react-router-dom';

const AddRoomForm = () => {
  const navigate = useNavigate();
  const roomTypeList = useSelector(selectRoomTypeList);
  const [form, setForm] = useState({
    number: {
      ...inputsInfo.room.number,
      value: 0,
    },
    floor: {
      ...inputsInfo.room.floor,
      value: 0,
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
    if (result.type === 'number' && value < 0) {
      return;
    }

    setForm({
      ...form,
      [name]: { ...result, value: value },
    });
  };

  const addRoomOnClick = async (e) => {
    e.preventDefault();

    try {
      const response = await createRoom(toAddRoomRequestMapper(form)).unwrap();
      toast.success(`Room ${response.number} added or updated successfully`);
      setTimeout(() => navigate('/dashboard'), 3 * 1000);
    } catch (e) {
      toast.error('Failed to add room with provided details');
    }
  };

  return (
    <div key={`add-room-form`} className={`w-full flex flex-wrap mt-8`}>
      <p
        className={`flex flex-col gap-2 text-sm text-dimWhite font-poppins font-thin leading-10 sm:leading-8`}>
        <span className={'text-2xl font-semibold text-white leading-[50px] sm:leading-8'}>
          Room
        </span>
        <span>Here, you can add new room by providing number, floor and room type.</span>
      </p>
      <div className={`w-full flex flex-wrap justify-between gap-5 mb-5 mt-8 sm:gap-0 text-start`}>
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
      <hr key={`line`} className={`w-full mt-11`} />
      <button className={`${styles.button} w-full sm:w-auto mt-5`} onClick={addRoomOnClick}>
        Add room
      </button>
    </div>
  );
};

export default AddRoomForm;
