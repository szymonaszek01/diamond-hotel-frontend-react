const CustomTag = ({ value }) => {
  return (
    <div
      key={`tag-${value}`}
      className="bg-yellow-gradient p-2 box-shadow rounded-[3px] flex items-center justify-center border-white border-[1px]">
      <p className="font-poppins font-thin text-white text-xs">{value}</p>
    </div>
  );
};

export default CustomTag;
