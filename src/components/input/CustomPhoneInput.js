import styles from '../../style';
import PhoneInput from 'react-phone-number-input';
import { Label } from '../index';

const CustomPhoneInput = ({ attributes, onChange, error, placeholder, label, customStyles }) => {
  return (
    <div className={`flex flex-col ${customStyles ?? 'w-full'}`}>
      <Label hidden={label} value={attributes.value} />
      <PhoneInput
        key={`input-${attributes.name}`}
        id={`input-${attributes.name}`}
        className={`${styles.input} phone ${error ? styles.error : ''}`}
        value={attributes.value}
        name={attributes.name}
        onChange={onChange}
        placeholder={placeholder ? attributes.label : ''}
      />
    </div>
  );
};

export default CustomPhoneInput;
