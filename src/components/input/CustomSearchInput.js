import { findJsonObjectListWithSearchValue } from '../../util';
import { Label } from '../index';
import { useState } from 'react';
import { closeRed, search } from '../../assets';

const CustomSearchInput = ({
  name,
  jsonObjectList,
  setFoundJsonObjectList,
  placeholder,
  label,
}) => {
  const [error, setError] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const onChange = (e) => {
    setError(false);
    setSearchValue(e.target.value);

    const foundJsonObjectList = findJsonObjectListWithSearchValue(e.target.value, jsonObjectList, [
      'value',
    ]);
    if (foundJsonObjectList.length < 1) {
      setError(true);
    }

    setFoundJsonObjectList(foundJsonObjectList);
  };

  return (
    <div key={`custom-search-input-${name}`} className="flex flex-col w-full">
      <Label hidden={label === undefined || label === null} value={label} />
      <div
        className={`w-full flex flex-row items-center py-[10px] border-[1px] rounded-[4px] ${
          error ? 'border-red-700' : ' border-white'
        }`}>
        <input
          type={`text`}
          key={`input-key-search-${name}`}
          id={`input-id-search-${name}`}
          className={`w-full text-[0.84rem] border-none ${error ? 'text-red-700' : 'text-white'}`}
          name={name}
          placeholder={placeholder ?? ''}
          value={searchValue}
          onChange={onChange}
        />
        <img
          src={search}
          alt={`search`}
          className={`${error ? 'hidden' : ''} w-auto h-[18px] mr-3 cursor-pointer`}
        />
        <img
          src={closeRed}
          alt={`close`}
          className={`${!error ? 'hidden' : ''} w-auto h-[18px] mr-3 cursor-pointer`}
          onClick={() => {
            setSearchValue('');
            setError(false);
          }}
        />
      </div>
      <p
        className={`${
          error ? '' : 'hidden'
        } mt-2 ml-3 font-poppins font-semibold text-xs text-red-700`}>
        Not found any row with provided value.
      </p>
    </div>
  );
};

export default CustomSearchInput;
