import { randomCode } from '../util';
import { TableActionModal, TableCell } from './index';

const TableHeader = ({ columnList, hidden }) => {
  return (
    <div
      key={`header-${randomCode(7)}`}
      className={`w-full flex flex-col sm:flex-row justify-center gap-2 sm:gap-0 sm:justify-between items-center p-0 sm:p-4`}>
      {columnList.map((column) => (
        <TableCell value={column} textColor={'text-gradient'} fontStyle={'font-bold'} />
      ))}
      <div className={hidden ? 'hidden' : 'invisible'}>
        <TableActionModal hidden={false} />
      </div>
    </div>
  );
};

export default TableHeader;
