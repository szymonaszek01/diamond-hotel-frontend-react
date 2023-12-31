import styles from '../../style';
import { Label } from '../index';

const CustomStandardInput = ({
  attributes,
  onChange,
  error,
  placeholder,
  autoComplete,
  label,
  customStyles,
  disabled,
}) => {
  return (
    <div className={`flex flex-col ${customStyles ?? 'w-full'}`}>
      <Label hidden={label} value={attributes.label} />
      <input
        type={attributes.type}
        key={`input-key-${attributes.name}`}
        id={`input-id-${attributes.name}`}
        className={`${styles.input} ${error ? styles.error : ''} w-full`}
        name={attributes.name}
        placeholder={placeholder ? attributes.label : ''}
        value={attributes.name === 'image' ? undefined : attributes.value}
        onChange={onChange}
        autoComplete={autoComplete ? attributes.autoComplete : ''}
        disabled={disabled ?? false}
      />
    </div>
  );
};

export default CustomStandardInput;
