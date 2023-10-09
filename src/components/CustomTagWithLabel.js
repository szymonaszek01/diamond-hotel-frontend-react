const CustomTagWithLabel = ({value, label, styles}) => {
  return (
    <div className={`flex flex-col items-center xs:items-start p-2 ${styles}`}>
      <p className="font-poppins font-thin text-gradient text-xs">{label}</p>
      <p className="font-poppins font-semibold text-white text-sm">{value}</p>
    </div>
  )
}

export default CustomTagWithLabel