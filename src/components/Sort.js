import { sortArrowActive, sortArrowNotActive } from '../assets';

const Sort = ({ tableName, column, updateColumnList }) => {
  const onClick = (e) => {
    const newSortValue = toSortValueMapper(e.target.name);
    updateColumnList({ ...column, sort: { ...column.sort, value: newSortValue } });
  };

  const toSortValueMapper = (newSortValue) => {
    if (
      (column.sort?.value === 'ASC' || column.sort?.value === 'DSC') &&
      column.sort?.value === newSortValue
    ) {
      return '';
    } else {
      return newSortValue;
    }
  };

  return (
    <div key={`sort-${tableName}-${column.name}`} className={`flex flex-col cursor-pointer`}>
      <img
        name={'ASC'}
        src={column.sort?.value === 'ASC' ? sortArrowActive : sortArrowNotActive}
        alt={`arrow-active`}
        className={`h-auto w-[10px]`}
        onClick={onClick}
      />
      <img
        name={'DSC'}
        src={column.sort?.value === 'DSC' ? sortArrowActive : sortArrowNotActive}
        alt={`arrow-active`}
        className={`h-auto w-[10px] rotate-180`}
        onClick={onClick}
      />
    </div>
  );
};

export default Sort;
