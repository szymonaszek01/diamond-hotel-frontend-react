import { useState } from 'react';
import { inputsInfo } from '../constants';
import {
  CustomDatePicker,
  CustomLoadingOverlay,
  CustomStandardInput,
  CustomTag,
  FindRoomFormFilters,
} from './index';
import { useGetRoomAvailabilityListMutation } from '../redux/api/roomApiSlice';
import { toast } from 'react-toastify';
import styles from '../style';
import { toRoomTypeDetailsListMapper } from '../redux/features/roomTypeSlice';

const FindRoomForm = ({ setRoomTypeDetailsList, updateReservationDetails, filters }) => {
  const [form, setForm] = useState({
    checkIn: { ...inputsInfo.roomType.checkIn, value: new Date() },
    checkOut: { ...inputsInfo.roomType.checkOut, value: new Date() },
    rooms: { ...inputsInfo.roomType.rooms, value: 0 },
    adults: { ...inputsInfo.roomType.adults, value: 0 },
    children: { ...inputsInfo.roomType.children, value: 0 },
  });
  const [getRoomAvailabilityList, { isLoading }] = useGetRoomAvailabilityListMutation();
  const [error, setError] = useState(false);
  const [filtersValues, setFiltersValues] = useState({
    pricePerHotelNight: 0,
    roomTypeIdList: [],
  });
  const [filtersLabels, setFiltersLabels] = useState([]);

  const onSaveFilters = (inputs) => {
    if (inputs.roomTypeIdList.length < 1) {
      inputs.roomTypeIdList = [];
    }

    setError(false);

    setFiltersValues({
      ...filtersValues,
      pricePerHotelNight: inputs.pricePerHotelNight.value,
      roomTypeIdList: inputs.roomTypeIdList.map((roomTypeId) => roomTypeId.value),
    });
    setFiltersLabels(
      [inputs.pricePerHotelNight.label].concat(
        inputs.roomTypeIdList.map((roomTypeId) => roomTypeId.label)
      )
    );
  };

  const checkAvailabilityOnClick = async (e) => {
    e.preventDefault();

    try {
      const response = await getRoomAvailabilityList({
        checkIn: form.checkIn.value.toISOString().split('T')?.at(0),
        checkOut: form.checkOut.value.toISOString().split('T')?.at(0),
        rooms: form.rooms.value,
        adults: form.adults.value,
        children: form.children.value,
        roomTypeIdList: filtersValues.roomTypeIdList,
        pricePerHotelNight: filtersValues.pricePerHotelNight,
      }).unwrap();

      setError(false);
      setRoomTypeDetailsList(toRoomTypeDetailsListMapper(response));
    } catch (error) {
      setError(true);
      toast.error('Required number of rooms is not found with this filters');
    }
  };

  const onInputChange = (name, value) => {
    const result = Object.values(form).find((input) => input.name === name);
    if (
      (name === form.checkIn.name && !datesValid(value, form.checkOut.value)) ||
      (name === form.checkOut.name && !datesValid(form.checkIn.value, value))
    ) {
      return;
    }
    if (
      ((name === form.rooms.name || name === form.adults.name) && value < 1) ||
      (name === form.children.name && value < 0)
    ) {
      return;
    }

    setError(false);

    setForm({
      ...form,
      [name]: { ...result, value: value ?? new Date() },
    });

    updateReservationDetails(name, value);
  };

  const datesValid = (firstDate, secondDate) => {
    return secondDate - firstDate > 0;
  };

  return isLoading ? (
    <CustomLoadingOverlay message={'Loading...'} />
  ) : (
    <div
      key={`find-room-form`}
      className="flex flex-col bg-black-gradient rounded-[10px] box-shadow p-5 w-full gap-5">
      <div
        className={filters ? 'flex flex-col sm:flex-row justify-end gap-2 items-center' : 'hidden'}>
        {filtersLabels
          .filter((filterLabel) => filterLabel !== '0$')
          .map((filterLabel) => (
            <CustomTag value={filterLabel} />
          ))}
        <FindRoomFormFilters onSave={onSaveFilters} />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-5">
        <CustomDatePicker
          attributes={form?.checkIn}
          error={error}
          onChange={(date) => onInputChange(form?.checkIn.name, date)}
          label={true}
        />
        <CustomDatePicker
          attributes={form?.checkOut}
          error={error}
          onChange={(date) => onInputChange(form?.checkOut.name, date)}
          label={true}
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-5">
        <CustomStandardInput
          attributes={form.rooms}
          error={error}
          onChange={(e) => onInputChange(e.target.name, e.target.value)}
          label={true}
        />
        <CustomStandardInput
          attributes={form.adults}
          error={error}
          onChange={(e) => onInputChange(e.target.name, e.target.value)}
          label={true}
        />
        <CustomStandardInput
          attributes={form.children}
          error={error}
          onChange={(e) => onInputChange(e.target.name, e.target.value)}
          label={true}
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-5">
        <button className={`${styles.button} outline-0`} onClick={checkAvailabilityOnClick}>
          Check availability
        </button>
      </div>
    </div>
  );
};

export default FindRoomForm;
