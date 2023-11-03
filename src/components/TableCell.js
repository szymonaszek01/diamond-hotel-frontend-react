import { randomCode } from '../util';
import Sort from './Sort';

const TableCell = ({
  tableName,
  value,
  icon,
  textColor,
  fontStyle,
  isHeader,
  updateColumnList,
}) => {
  return (
    <div
      key={`cell-${randomCode(4)}`}
      className={`flex flex-row text-center gap-2 items-center justify-center w-[100px] bg-transparent`}>
      <p
        className={`${icon ? 'hidden' : ''} text-xs ${textColor ?? 'text-white'} font-poppins ${
          fontStyle ?? 'font-thin'
        } break-words`}>
        {isHeader ? value.name : value}
      </p>
      <div className={isHeader && value.sort ? '' : 'hidden'}>
        <Sort tableName={tableName} column={value} updateColumnList={updateColumnList} />
      </div>
      <img src={icon} alt={`status`} className={`${icon ? '' : 'hidden'} w-[19px] h-auto`} />
    </div>
  );
};

export default TableCell;
