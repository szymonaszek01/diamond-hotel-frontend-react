import styles from "../style";

const CustomStandardInput = ({attributes, onChange, error}) => {
  return (
    <input type={attributes.type} key={`input-key-${attributes.name}`} id={`input-id-${attributes.name}`}
           className={`${styles.input} ${error ? styles.error : ''}`}
           name={attributes.name} value={attributes.name === "image" ? undefined : attributes.value} onChange={onChange}/>
  )
}

export default CustomStandardInput