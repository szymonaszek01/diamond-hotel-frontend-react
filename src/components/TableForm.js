import { useDispatch, useSelector } from 'react-redux';
import { selectUserDetails } from '../redux/features/user/userSlice';
import { useEffect, useState } from 'react';
import { ButtonWithIcon, CustomSearchInput, Table, TableSlider } from './index';
import { transferObjectKeyToLabel } from '../util';
import { moreArrow } from '../assets';

const TableForm = ({
  tableName,
  optionList,
  setOptionList,
  optionCardWidth,
  api,
  toTableMapper,
  text,
  actionList,
  page,
  setPage,
}) => {
  const userDetails = useSelector(selectUserDetails);
  const dispatch = useDispatch();

  const [table, setTable] = useState({
    columnList: [],
    rowList: [],
    loadedRowList: [],
  });

  const setFoundJsonObjectList = (foundJsonObjectListWithSearchValue) => {
    setTable({
      ...table,
      rowList:
        foundJsonObjectListWithSearchValue.length > 0
          ? foundJsonObjectListWithSearchValue
          : table.loadedRowList,
    });
  };

  useEffect(() => {
    const loadTableForm = () => {
      const selectedOption = optionList.find((option) => option.isSelected);
      let filters = { page: page ?? 0, size: 5 };
      if (selectedOption.queryParamName.length > 0 && selectedOption.value.length > 0) {
        filters = { ...filters, [selectedOption.queryParamName]: selectedOption.value };
      }

      api({
        userProfileId: userDetails.id,
        filters: filters,
      })
        .then((response) => {
          const { columnList, rowList } = toTableMapper(response?.data);
          if (table.rowList.length % 5 === 0 && rowList.length === 0 && page > 0) {
            setPage(page - 1);
          }
          const updatedRowList = page === 0 ? rowList : table.rowList.concat(rowList);

          setTable({
            ...table,
            columnList: columnList,
            rowList: updatedRowList,
            loadedRowList: updatedRowList,
          });
        })
        .catch((error) => console.log(error));
    };

    loadTableForm();
  }, [dispatch, api, optionList, page, userDetails.id]);

  return (
    <div
      key={`table-${tableName}`}
      className="flex flex-col w-full items-center justify-center mt-8">
      <div className={'flex flex-col items-start justify-center w-full gap-8'}>
        <TableSlider
          optionList={optionList}
          setOptionList={setOptionList}
          setPage={setPage}
          itemWidth={optionCardWidth}
        />
        {table.rowList.length ? (
          <p className={`text-sm text-dimWhite font-poppins font-thin break-all ml-2 leading-7`}>
            <strong className={'text-sm font-semibold text-white'}>
              {transferObjectKeyToLabel(tableName)} Details
            </strong>
            <br />
            {text}
          </p>
        ) : (
          <p className={`text-sm text-dimWhite font-poppins font-thin break-all ml-2 leading-7`}>
            <strong className={'text-sm font-semibold text-white'}>
              Empty {transferObjectKeyToLabel(tableName)} list
            </strong>
            <br />
            Please, book a room and see the details.
          </p>
        )}
        {table.rowList.length > 0 ? (
          <div className={`w-full flex flex-col gap-8`}>
            <CustomSearchInput
              name={`table-${tableName}`}
              placeholder={'Search'}
              jsonObjectList={table.loadedRowList}
              setFoundJsonObjectList={setFoundJsonObjectList}
            />
            <Table
              name={tableName}
              columnList={table.columnList}
              rowList={table.rowList}
              actionList={actionList?.filter((action) =>
                action.optionIdList.find(
                  (optionId) => optionId === optionList.find((option) => option.isSelected).id
                )
              )}
            />
          </div>
        ) : (
          ''
        )}
        {table.rowList.length > 0 ? (
          <div className={table.rowList.length % 5 !== 0 ? 'hidden' : ''}>
            <ButtonWithIcon
              text={'More'}
              img={moreArrow}
              imgAlt={'more'}
              imgWidth={'15px'}
              action={() => setPage(page + 1)}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default TableForm;
