const CustomLoadingOverlayNotFixed = ({ message, customStyle }) => {
  return (
    <div
      key={'custom-overlay-not-fixed'}
      className={`w-full h-[300px] bg-transparent box-shadow flex items-center justify-center text-white text-sm font-semibold rounded-[3px] ${
        customStyle ?? ''
      }`}>
      {message}
    </div>
  );
};

export default CustomLoadingOverlayNotFixed;
