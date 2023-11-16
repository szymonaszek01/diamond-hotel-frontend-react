import Popup from 'reactjs-popup';
import { close, filtersIcon } from '../../../assets';
import { useState } from 'react';
import { inputsInfo, role } from '../../../constants';
import { CustomDatePicker, CustomSelectComponent, CustomStandardInput } from '../../../components';
import styles from '../../../style';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../../redux/features/user/userSlice';
import { toRoomTypeSelectMapper } from '../../../redux/features/roomType/roomTypeMapper';
import { selectRoomTypeList } from '../../../redux/features/roomType/roomTypeSlice';
import { getCurrentDate } from '../../../util';

const ReservationFilters = ({ setAdvancedFilters }) => {
  const userRole = useSelector(selectUserRole);
  const roomTypeList = useSelector(selectRoomTypeList);
  const [form, setForm] = useState({
    minDate: {
      ...inputsInfo.reservation.minDate,
      queryParamName: 'min_date',
      value: '',
    },
    maxDate: {
      ...inputsInfo.reservation.maxDate,
      queryParamName: 'max_date',
      value: '',
    },
    userProfileEmail: {
      ...inputsInfo.reservation.userProfileEmail,
      queryParamName: 'user_profile_email',
      value: '',
      userRole: role.admin,
    },
    flightNumber: { ...inputsInfo.flight.flightNumber, queryParamName: 'flight_number', value: '' },
    minPaymentCost: {
      ...inputsInfo.reservation.minPaymentCost,
      queryParamName: 'min_payment_cost',
      value: 0,
    },
    maxPaymentCost: {
      ...inputsInfo.reservation.maxPaymentCost,
      queryParamName: 'max_payment_cost',
      value: 0,
    },
    paymentCharge: {
      ...inputsInfo.reservation.paymentCharge,
      queryParamName: 'payment_charge',
      value: '',
    },
    roomTypeName: {
      ...inputsInfo.roomType.names,
      name: 'roomTypeName',
      label: 'Room Type Name',
      queryParamName: 'room_type_name',
      value: '',
      options: toRoomTypeSelectMapper(roomTypeList),
    },
  });

  const onInputChange = (name, value) => {
    const result = Object.values(form).find((input) => input.name === name);
    if (
      (name === form.minDate.name && !datesValid(value, form.maxDate.value)) ||
      (name === form.maxDate.name && !datesValid(form.minDate.value, value))
    ) {
      return;
    }

    setForm({
      ...form,
      [name]: { ...result, value: value ?? new Date() },
    });
  };

  const datesValid = (firstDate, secondDate) => {
    return secondDate - firstDate > 0 || firstDate === '' || secondDate === '';
  };

  const onButtonSubmitClick = () => {
    let advancedFilters = {};
    Object.entries(form).forEach(
      ([name, attributes]) =>
        (advancedFilters[name] = {
          queryParamName: attributes.queryParamName,
          value: getNewValue(attributes),
        })
    );
    setAdvancedFilters(advancedFilters);
  };

  const getNewValue = (attributes) => {
    if (attributes.type === 'text') {
      return attributes.value;
    } else if (attributes.type === 'number') {
      return attributes.value > 0 ? attributes.value : '';
    } else if (attributes.name === 'roomTypeName') {
      return attributes.value !== '' ? attributes.value.label : '';
    } else {
      return attributes.value ? getDate(attributes.value) : '';
    }
  };

  const getDate = (date) => {
    return date.toISOString().split('T')?.at(0);
  };

  return (
    <div key={`reservation-filters-modal`} className={'w-full sm:w-auto'}>
      <Popup
        position={'center center'}
        lockScroll={false}
        trigger={
          <button className="w-full flex items-center justify-center mt-[0.21rem] py-[0.63rem] px-4 border-white border-[1px] rounded-[4px] gap-2">
            <img src={filtersIcon} alt="filters" className="w-auto h-[17px]" />
            <p className="font-poppins font-thin text-[0.84rem] text-white">Filters</p>
          </button>
        }
        modal
        nested
        closeOnDocumentClick={false}>
        {(closeModal) => (
          <div className={`w-full flex flex-wrap gap-5 bg-black-gradient p-5 rounded-[10px]`}>
            <div className={`w-full flex justify-end`}>
              <img
                src={close}
                alt={`close`}
                className={`w-auto h-[17px] cursor-pointer`}
                onClick={() => closeModal()}
              />
            </div>
            <div className="flex flex-wrap gap-5 rounded-[10px]">
              <CustomDatePicker
                attributes={form?.minDate}
                onChange={(date) => onInputChange(form?.minDate.name, date)}
                label={true}
                customStyles={`w-full sm:w-auto sm:w-max-[200px]`}
              />
              <CustomDatePicker
                attributes={form?.maxDate}
                onChange={(date) => onInputChange(form?.maxDate.name, date)}
                label={true}
                customStyles={`w-full sm:w-auto sm:w-max-[200px]`}
              />
              {Object.values(form)
                .filter(
                  (obj) =>
                    obj.name !== 'minDate' &&
                    obj.name !== 'maxDate' &&
                    obj.name !== 'roomTypeName' &&
                    (obj.userRole === undefined || (obj.userRole && obj.userRole === userRole))
                )
                .map((obj) => (
                  <CustomStandardInput
                    attributes={obj}
                    onChange={(e) => onInputChange(e.target.name, e.target.value)}
                    label={true}
                    customStyles={`w-full sm:w-auto sm:w-max-[200px]`}
                  />
                ))}
              <CustomSelectComponent
                attributes={form.roomTypeName}
                onChange={(newValue) => onInputChange(form.roomTypeName.name, newValue)}
                label={true}
                multi={false}
                width={'w-full sm:w-[193px]'}
              />
            </div>
            <div className={`w-full flex gap-5 justify-end`}>
              <button
                className={`${styles.button} w-full sm:w-auto text-black`}
                onClick={() => {
                  onButtonSubmitClick();
                  closeModal();
                }}>
                Submit
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default ReservationFilters;
