import { randomCode } from '../util';

const TableCell = ({ value, icon, textColor, fontStyle }) => {
  return (
    <div
      key={`cell-${randomCode(4)}`}
      className={`flex flex-col text-center sm:text-start items-center justify-start w-[100px] bg-transparent`}>
      <p
        className={`${icon ? 'hidden' : ''} text-[0.79rem] ${
          textColor ?? 'text-white'
        } font-poppins ${fontStyle ?? 'font-thin'} break-all`}>
        {value}
      </p>
      <img src={icon} alt={`status`} className={`${icon ? '' : 'hidden'} w-[19px] h-auto`} />
    </div>
  );
};

export default TableCell;
