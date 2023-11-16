import { Label } from '../index';
import styles from '../../style';
import DatePicker from 'react-datepicker';

const CustomDatePicker = ({ attributes, onChange, error, label, customStyles }) => {
  return (
    <div className={`flex flex-col ${customStyles ?? 'w-full'}`}>
      <Label hidden={label} value={attributes.label} />
      <DatePicker
        key={`input-key-${attributes.name}`}
        id={`input-id-${attributes.name}`}
        className={`${styles.input} ${error ? styles.error : ''} w-full`}
        selected={attributes?.value}
        onSelect={onChange}
      />
    </div>
  );
};

export default CustomDatePicker;
