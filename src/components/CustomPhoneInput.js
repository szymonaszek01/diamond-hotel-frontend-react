import styles from "../style";
import PhoneInput from "react-phone-number-input";

const CustomPhoneInput = ({attributes, onChange, error, placeholder}) => {
  return (
    <PhoneInput
      key={`input-${attributes.name}`}
      id={`input-${attributes.name}`}
      className={`${styles.input} phone ${error ? styles.error : ''}`}
      value={attributes.value}
      name={attributes.name} onChange={onChange}
      placeholder={placeholder ? attributes.label : ""}
    />
  )
}

export default CustomPhoneInput