import { close } from '../../assets';
import { useState } from 'react';

const CustomCloseTag = ({ value, onClose }) => {
  const [clear, setClear] = useState(false);
  return (
    <div
      key={`custom-close-tag-${value.toLowerCase().replaceAll(' ', '-')}`}
      className={`w-full sm:w-auto sm:min-w-[125px] flex items-center justify-center text-center border-white border-[1px] rounded-[4px] px-3 py-2.5 cursor-pointer`}
      onMouseMoveCapture={() => setClear(true)}
      onMouseLeave={() => setClear(false)}>
      <p className={`font-poppins text-white text-xs ${clear ? 'hidden' : ''}`}>{value}</p>
      <img
        src={close}
        alt={`close`}
        className={`w-[15px] h-auto ${clear ? '' : 'hidden'}`}
        onClick={() => onClose(value)}
      />
    </div>
  );
};

export default CustomCloseTag;
