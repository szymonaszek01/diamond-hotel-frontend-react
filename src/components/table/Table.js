import { randomCode } from '../../util';
import { TableHeader, TableRow } from '../index';

const Table = ({ name, columnList, rowList, actionList, updateColumnList }) => {
  return (
    <div
      key={`table-${randomCode(7)}`}
      className="flex flex-col items-start justify-center w-[100%] rounded-[3px] px-4 pb-4 box-shadow outline-none">
      <TableHeader
        tableName={name}
        columnList={columnList}
        hidden={!actionList || actionList.length < 1}
        updateColumnList={updateColumnList}
      />
      {rowList.map((row, index) => (
        <TableRow
          index={index}
          columnList={columnList}
          cellList={row}
          actionList={actionList}
          isLastRow={index === rowList.length - 1}
        />
      ))}
    </div>
  );
};

export default Table;
