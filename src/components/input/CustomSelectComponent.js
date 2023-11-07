import Select from 'react-select';
import { Label } from '../index';

const CustomSelectComponent = ({ attributes, onChange, error, placeholder, label }) => {
  const customStyles = {
    control: (styles, state) => ({
      ...styles,
      fontFamily: 'Poppins, sans-serif',
      fontSize: '14px',
      background: 'transparent',
      borderRadius: '10px',
      boxShadow: 'none',
      border: error ? '1px solid rgb(220 38 38)' : '1px solid #FFFFFF',
      color: error ? 'rgb(220 38 38)' : '#FFFFFF',
      outline: 'none',
      paddingTop: '3px',
      paddingBottom: '3px',
      '&:hover': {
        borderColor: '#FFFFFF',
      },
    }),
    menu: (styles) => {
      return {
        ...styles,
        background: 'linear-gradient(144.39deg, #ffffff -278.56%, #6d6d6d -78.47%, #000000 91.61%)',
        borderRadius: '10px',
        border: '1px solid #FFFFFF',
      };
    },
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        fontFamily: 'Poppins, sans-serif',
        fontSize: '12px',
        background: 'transparent',
        color: '#FFFFFF',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      };
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        fontFamily: 'Poppins, sans-serif',
        fontSize: '12px',
        padding: '3px',
        background: '#FFFFFF',
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: '#000000',
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: '#000000',
    }),
  };
  return (
    <div className="flex flex-col w-full">
      <Label hidden={label} value={attributes.label} />
      <Select
        name={attributes.name}
        key={`input-key-${attributes.name}`}
        id={`input-id-${attributes.name}`}
        closeMenuOnSelect={false}
        styles={customStyles}
        isMulti
        value={attributes.value}
        onChange={onChange}
        options={attributes.options}
        placeholder={placeholder ? attributes.label : ''}
      />
    </div>
  );
};

export default CustomSelectComponent;
