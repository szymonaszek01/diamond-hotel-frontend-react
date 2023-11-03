import { TableActionModal, TableCell } from './index';

const TableHeader = ({ tableName, columnList, hidden, updateColumnList }) => {
  return (
    <div
      key={`header-${tableName}`}
      className={`w-full flex flex-col sm:flex-row justify-center gap-2 sm:gap-0 sm:justify-between items-center p-0 sm:p-4`}>
      {columnList.map((column) => (
        <TableCell
          value={column}
          textColor={'text-gradient'}
          fontStyle={'font-bold'}
          isHeader={true}
          tableName={tableName}
          updateColumnList={updateColumnList}
        />
      ))}
      <div className={hidden ? 'hidden' : 'invisible'}>
        <TableActionModal hidden={false} />
      </div>
    </div>
  );
};

export default TableHeader;
