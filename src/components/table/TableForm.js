import { useDispatch, useSelector } from 'react-redux';
import { selectUserDetails } from '../../redux/features/user/userSlice';
import { useEffect, useState } from 'react';
import {
  ButtonWithIcon,
  ClearFiltersButton,
  CustomLoadingOverlay,
  CustomSearchInput,
  Table,
  TableFiltersTagContainer,
  TableSlider,
} from '../index';
import { transferObjectKeyToLabel } from '../../util';
import { moreArrow } from '../../assets';

const TableForm = ({
  tableName,
  optionList,
  setOptionList,
  optionCardWidth,
  api,
  toTableMapper,
  advancedFilters,
  setAdvancedFilters,
  advancedFiltersElement,
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
  const [loading, setLoading] = useState(false);

  const updateColumnList = (updatedColumn) => {
    const newColumnList = table.columnList.map((column) =>
      column.name === updatedColumn.name ? updatedColumn : column
    );

    getTableData(newColumnList);
  };

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
      getTableData([]);
    };

    loadTableForm();
  }, [dispatch, advancedFilters, api, optionList, page, userDetails.id]);

  const getTableData = (newColumnList) => {
    setLoading(true);
    const tableFilters = getTableFilters();
    const tableSort = getTableSort(newColumnList);

    api({
      userProfileId: userDetails.id,
      filters: {
        page: 0,
        size: 5 * (page + 1),
        filters: JSON.stringify(tableFilters),
      },
      sort: JSON.stringify(tableSort.filter((obj) => obj !== undefined)),
    })
      .then((response) => {
        const { columnList, rowList } = toTableMapper(response?.data);
        if (response?.data.length <= 5) {
          setPage(0);
        }
        if (table.rowList.length % 5 === 0 && rowList.length === 0 && page > 0) {
          setPage(page - 1);
        }

        setTable({
          ...table,
          columnList: newColumnList.length > 1 ? newColumnList : columnList,
          rowList: rowList,
          loadedRowList: rowList,
        });
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const getTableFilters = () => {
    const selectedOption = optionList.find((option) => option.isSelected);
    let tableFilters = { [selectedOption.queryParamName]: selectedOption.value };
    Object.values(advancedFilters).forEach((obj) => (tableFilters[obj.queryParamName] = obj.value));

    return tableFilters;
  };

  const getTableSort = (newColumnList) => {
    let tableSort = newColumnList.length > 0 ? newColumnList.map((column) => column.sort) : [];

    return tableSort.filter((obj) => obj !== undefined);
  };

  const onButtonClearClick = () => {
    let defaultAdvancedFilters = {};
    Object.entries(advancedFilters).forEach(([name, attributes]) => {
      defaultAdvancedFilters[name] = {
        queryParamName: attributes.queryParamName,
        value: '',
      };
    });
    setAdvancedFilters(defaultAdvancedFilters);
  };

  return loading ? (
    <CustomLoadingOverlay message={'Loading table data...'} />
  ) : (
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
        <div className={`w-full flex flex-col sm:flex-row items-start gap-8 sm:gap-3`}>
          <CustomSearchInput
            name={`table-${tableName}`}
            placeholder={'Search'}
            jsonObjectList={table.loadedRowList}
            setFoundJsonObjectList={setFoundJsonObjectList}
          />
          {advancedFiltersElement &&
          Object.values(advancedFilters).find(({ value }) => value.length > 0) !== undefined ? (
            <ClearFiltersButton onClick={onButtonClearClick} />
          ) : (
            advancedFiltersElement ?? ''
          )}
        </div>
        <TableFiltersTagContainer
          name={`table-filters-tag-container-${tableName}-${
            optionList.find((option) => option.isSelected)?.value
          }`}
          advancedFilters={advancedFilters}
        />
        {table.rowList.length ? (
          <p className={`text-sm text-dimWhite font-poppins font-thin break-all leading-7`}>
            <strong className={'text-sm font-semibold text-white'}>
              {transferObjectKeyToLabel(tableName)} Details
            </strong>
            <br />
            {text}
          </p>
        ) : (
          <p className={`text-sm text-dimWhite font-poppins font-thin break-all leading-7`}>
            <strong className={'text-sm font-semibold text-white'}>
              Empty {transferObjectKeyToLabel(tableName)} list
            </strong>
            <br />
            Please, book a room and see the details.
          </p>
        )}
        {table.rowList.length > 0 ? (
          <div className={`w-full flex flex-col gap-8`}>
            <Table
              name={tableName}
              columnList={table.columnList}
              rowList={table.rowList}
              actionList={actionList?.filter((action) =>
                action.optionIdList.find(
                  (optionId) => optionId === optionList.find((option) => option.isSelected).id
                )
              )}
              updateColumnList={updateColumnList}
            />
          </div>
        ) : (
          ''
        )}
        {table.rowList.length > 0 ? (
          <div
            className={`w-full flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-5`}>
            <div className={table.rowList.length % 5 !== 0 ? 'hidden' : ''}>
              <ButtonWithIcon
                text={'More'}
                img={moreArrow}
                imgAlt={'more'}
                imgWidth={'15px'}
                action={() => setPage(page + 1)}
              />
            </div>
            <div className={page < 1 || table.rowList <= 5 ? 'hidden' : ''}>
              <ButtonWithIcon
                text={'Less'}
                img={moreArrow}
                imgAlt={'Less'}
                imgWidth={'15px'}
                action={() => setPage(page > 0 ? page - 1 : 0)}
                customIconStyle={`rotate-180`}
              />
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default TableForm;
