import styles from "../style";

const CustomStandardInput = ({attributes, onChange, error, placeholder, autoComplete}) => {
  return (
    <input type={attributes.type} key={`input-key-${attributes.name}`} id={`input-id-${attributes.name}`}
           className={`${styles.input} ${error ? styles.error : ''} z-50`}
           name={attributes.name} placeholder={placeholder ? attributes.label : ""}
           value={attributes.name === "image" ? undefined : attributes.value} onChange={onChange}
           autoComplete={autoComplete ? attributes.autoComplete : ""}/>
  )
}

export default CustomStandardInput