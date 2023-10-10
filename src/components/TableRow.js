import { randomCode } from '../util';
import { TableActionMenu, TableCell } from './index';

const TableRow = ({ index, columnList, cellList, isLastRow, actionList }) => {
  const isEven = index % 2 === 0;
  const id = cellList.find((cell) => cell.name === 'Id')?.value;

  return (
    <div
      key={`row-${randomCode(7)}`}
      className={`${
        isEven ? 'border-y-[1px] border-[#ebeef1]' : ''
      } w-full flex flex-col sm:flex-row gap-2 sm:gap-0 justify-center sm:justify-between items-center p-4 ${
        isLastRow ? 'border-b-[1px] border-[#ebeef1]' : ''
      }`}>
      {columnList.map((column) => {
        const foundCell = cellList.find((cell) => cell.name === column);

        return foundCell ? <TableCell value={foundCell.value} /> : ``;
      })}
      <TableActionMenu actionList={actionList} id={id} />
    </div>
  );
};

export default TableRow;
