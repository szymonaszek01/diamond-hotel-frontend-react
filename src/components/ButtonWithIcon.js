const ButtonWithIcon = ({ img, imgWidth, imgAlt, text, action }) => {
  const renderImgWidth = () => {
    return `w-[${imgWidth}]`;
  };

  return (
    <button
      onClick={action}
      className="flex items-center justify-center p-2 border-white border-[1px] rounded-[3px] gap-2">
      <img
        src={img}
        alt={imgAlt}
        className={`${imgWidth ? renderImgWidth() : 'w-[14px]'} h-auto`}
      />
      <p className="font-poppins font-thin text-xs text-white">{text}</p>
    </button>
  );
};

export default ButtonWithIcon;