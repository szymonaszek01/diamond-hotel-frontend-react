import styles from '../../style';
import { useRef, useState } from 'react';
import { close } from '../../assets';

const CustomUploadFileInput = ({
  attributes,
  onChange,
  error,
  image,
  customStyles,
  borderOff,
  filePathOff,
  paddingOff,
}) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');

  const renderImage = () => {
    return (
      <div
        className={`flex w-[20%] justify-center rounded-[4px] h-auto ${
          !image.default ? '' : 'p-5 box-shadow'
        } w-[8.5rem]`}>
        <img
          src={image.src}
          className={`${!image.default ? 'rounded-[10px]' : ''} max-w-[90px]`}
          alt={image.alt}
        />
      </div>
    );
  };

  const onClick = (e) => {
    setValue('');
    inputRef.current.click();
  };

  const onImageChange = (e) => {
    setValue(e.target.value);
    onChange(e);
  };

  return (
    <div
      className={`mt-4 ${image.visible ? 'flex flex-col gap-5 items-center justify-center' : ''} ${
        customStyles ?? 'w-[100px] sm:w-full'
      }`}>
      {image.visible ? renderImage() : ''}
      <div
        className={`flex flex-col justify-center sm:flex-row sm:justify-start items-center gap-3 mt-3 sm:mt-0 ${
          paddingOff ? '' : 'p-2'
        } ${borderOff ? '' : 'border-dashed border-white border-[1px]'} rounded-[4px] ${
          error ? styles.error : ''
        }`}>
        <button
          className={`${value.length > 0 ? 'hidden' : ''} ${styles.button} text-black`}
          onClick={onClick}>
          Upload
        </button>
        <img
          src={close}
          alt="close"
          className={`${value.length < 1 ? 'hidden' : ''} w-[13px] h-auto outline-0 cursor-pointer`}
          onClick={() => setValue('')}></img>
        <input
          type={attributes.type}
          key={`input-${attributes.name}`}
          id={`input-${attributes.name}`}
          name={attributes.name}
          value={value}
          onChange={onImageChange}
          ref={inputRef}
          className="hidden"
        />
        <p className={`text-white text-xs break-all ${filePathOff ? 'hidden' : ''}`}>
          {value.length > 0 ? value : `Please, choose a file`}
        </p>
      </div>
    </div>
  );
};

export default CustomUploadFileInput;
