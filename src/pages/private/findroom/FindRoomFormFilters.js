import styles from '../../../style';
import Popup from 'reactjs-popup';
import { CustomSelectComponent, CustomStandardInput } from '../../../components';
import { useState } from 'react';
import { inputsInfo } from '../../../constants';
import { filtersIcon } from '../../../assets';
import { toRoomTypeSelectMapper } from '../../../redux/features/roomType/roomTypeMapper';
import { useSelector } from 'react-redux';
import { selectRoomTypeList } from '../../../redux/features/roomType/roomTypeSlice';

const FindRoomFormFilters = ({ onSave }) => {
  const roomTypeList = useSelector(selectRoomTypeList);

  const [filters, setFilters] = useState({
    names: {
      ...inputsInfo.roomType.names,
      value: '',
      options: toRoomTypeSelectMapper(roomTypeList),
      selected: [],
    },
    pricePerHotelNight: { ...inputsInfo.roomType.pricePerHotelNight, value: 0 },
  });
  const [error, setError] = useState(false);

  const onInputChange = (name, value) => {
    const result = Object.values(filters).find((input) => input.name === name);

    setError(false);

    if (name === 'pricePerHotelNight' && value < 0) {
      value = 0;
    }

    setFilters({
      ...filters,
      [name]: { ...result, value: value },
    });
  };

  return (
    <div key={`room-filters`} className={'w-full sm:w-auto'}>
      <Popup
        trigger={
          <button className="w-full flex items-center justify-center py-2.5 px-2 border-white border-[1px] rounded-[3px] gap-2">
            <img src={filtersIcon} alt="filters" className="w-[17px] h-auto" />
            <p className="font-poppins font-thin text-xs text-white">Filters</p>
          </button>
        }
        modal
        nested>
        {(close) => (
          <div className="flex flex-col bg-transparent rounded-[10px] items-center justify-center">
            <div className="w-full sm:w-[60%] bg-black-gradient box-shadow rounded-[10px] p-5 flex flex-col gap-5">
              <div className="flex flex-col gap-5 w-full">
                <CustomStandardInput
                  attributes={filters.pricePerHotelNight}
                  error={error}
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                  label={true}
                />
                <CustomSelectComponent
                  multi={true}
                  attributes={filters.names}
                  error={error}
                  onChange={(newValue) => onInputChange(filters.names.name, newValue)}
                  label={true}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-5">
                <button
                  className={`${styles.button} text-black`}
                  onClick={() => {
                    close();
                    onSave({
                      pricePerHotelNight: {
                        value: filters.pricePerHotelNight.value,
                        label: filters.pricePerHotelNight.value + '$',
                      },
                      roomTypeIdList: filters.names.value ?? [],
                    });
                  }}>
                  Save
                </button>
                <button className={`${styles.button} text-black`} onClick={() => close()}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default FindRoomFormFilters;
