import { Label } from './index';
import styles from '../style';
import DatePicker from 'react-datepicker';

const CustomDatePicker = ({ attributes, onChange, error, label }) => {
  return (
    <div className="flex flex-col w-full">
      <Label hidden={label} value={attributes.label} />
      <DatePicker
        key={`input-key-${attributes.name}`}
        id={`input-id-${attributes.name}`}
        className={`${styles.input} ${error ? styles.error : ''} w-full`}
        selected={attributes?.value}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomDatePicker;
