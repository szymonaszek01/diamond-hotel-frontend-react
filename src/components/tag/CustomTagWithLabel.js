const CustomTagWithLabel = ({ name, value, label, styles, labelStyle, valueStyle }) => {
  return (
    <div
      key={`custom-tag-with-label-${name}`}
      className={`w-full sm:w-auto flex flex-col items-center xs:items-start p-2 ${styles}`}>
      <p className={`font-poppins break-all ${labelStyle ?? 'font-thin text-gradient text-xs'}`}>
        {label}
      </p>
      <p
        className={`font-poppins break-all ${
          valueStyle ?? 'font-semibold text-white text-sm break-all'
        }`}>
        {value.length > 30 ? value.substring(0, 30) + '...' : value}
      </p>
    </div>
  );
};

export default CustomTagWithLabel;
