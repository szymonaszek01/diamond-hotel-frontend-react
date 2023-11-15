import { Steps } from '../../../components';
import styles from '../../../style';
import { useState } from 'react';
import { inputsInfo } from '../../../constants';
import AddRoomTypeBase from './AddRoomTypeBase';
import AddRoomTypeImage from './AddRoomTypeImage';
import AddRoomTypeEquipment from './AddRoomTypeEquipment';
import { toast } from 'react-toastify';
import { toRoomTypeRequestMapper } from '../../../redux/features/roomType/roomTypeMapper';
import { useCreateRoomTypeMutation } from '../../../redux/api/roomTypeApiSlice';
import { useNavigate } from 'react-router-dom';

const AddRoomTypeForm = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [image, setImage] = useState('');
  const [form, setForm] = useState({
    name: {
      ...inputsInfo.roomType.name,
      value: '',
    },
    adults: {
      ...inputsInfo.roomType.adults,
      value: 0,
    },
    children: {
      ...inputsInfo.roomType.children,
      value: 0,
    },
    pricePerHotelNight: {
      ...inputsInfo.roomType.pricePerHotelNight,
      value: 0,
    },
    image: { ...inputsInfo.roomType.image, value: [] },
    equipment: {
      ...inputsInfo.roomType.equipment,
      value: ['Bed', 'Private Spa', 'Tv'],
    },
  });
  const [createRoomType] = useCreateRoomTypeMutation();

  const addRoomTypeOnClick = async (e) => {
    e.preventDefault();

    try {
      const response = await createRoomType(toRoomTypeRequestMapper(form)).unwrap();
      toast.success(`Room type ${response.name} added or updated successfully`);
      setTimeout(() => navigate('/dashboard'), 3 * 1000);
    } catch (e) {
      toast.error('Failed to add room type with provided details');
    }
  };

  const nextStep = () => {
    setCount(count < 3 ? count + 1 : count);
  };

  const previousStep = () => {
    setCount(count > 1 ? count - 1 : count);
  };

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

  return (
    <div key={`add-room-type-form`} className={`w-full flex flex-wrap`}>
      <p
        className={`flex flex-col gap-2 text-sm text-dimWhite font-poppins font-thin leading-10 sm:leading-8`}>
        <span className={'text-2xl font-semibold text-white leading-[50px] sm:leading-8'}>
          Room Type
        </span>
        <span>
          Diversify your property's appeal by adding a new room type. Fill in the details below to
          showcase the unique features of this room category.
        </span>
      </p>
      <div className={`w-full mb-16`}>
        <Steps steps={3} count={count} error={false} validationOff={true} />
      </div>
      {count === 1 ? (
        <AddRoomTypeBase form={form} onInputChange={onInputChange} />
      ) : count === 2 ? (
        <AddRoomTypeImage
          form={form}
          onInputChange={onInputChange}
          image={image}
          setImage={setImage}
        />
      ) : (
        <AddRoomTypeEquipment form={form} onInputChange={onInputChange} />
      )}
      <hr key={`line`} className={`w-full mt-11`} />
      <div className={'w-full flex flex-wrap gap-5 mt-5'}>
        <button
          className={`${styles.button} w-full sm:w-auto ${count === 1 ? 'hidden' : ''}`}
          onClick={previousStep}>
          Previous
        </button>
        <button
          className={`${styles.button} w-full sm:w-auto ${count === 3 ? 'hidden' : ''}`}
          onClick={nextStep}>
          Next
        </button>
        <button
          className={`${styles.button} w-full sm:w-auto ${count !== 3 ? 'hidden' : ''}`}
          onClick={addRoomTypeOnClick}>
          Add room type
        </button>
      </div>
    </div>
  );
};

export default AddRoomTypeForm;
