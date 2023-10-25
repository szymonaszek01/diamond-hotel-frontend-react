import { useDispatch, useSelector } from 'react-redux';
import { selectUserDetails } from '../redux/features/user/userSlice';
import { useEffect, useState } from 'react';
import { ButtonWithIcon, Table, TableSlider } from './index';
import { randomCode, transferObjectKeyToLabel } from '../util';
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
}) => {
  const userDetails = useSelector(selectUserDetails);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [table, setTable] = useState({
    columnList: [],
    rowList: [],
  });

  useEffect(() => {
    const loadTableForm = async () => {
      try {
        const selectedOption = optionList.find((option) => option.isSelected);
        let filters = { page: page ?? 0, size: 5 };
        if (selectedOption.queryParamName.length > 0 && selectedOption.value.length > 0) {
          filters = { ...filters, [selectedOption.queryParamName]: selectedOption.value };
        }

        const response = await api({
          userProfileId: userDetails.id,
          filters: filters,
        }).unwrap();

        const { columnList, rowList } = toTableMapper(response);
        if (table.rowList.length % 5 === 0 && rowList.length === 0 && page > 0) {
          setPage(page - 1);
        }

        setTable({
          ...table,
          columnList: columnList,
          rowList: page === 0 ? rowList : table.rowList.concat(rowList),
        });
      } catch (error) {
        console.log(error);
      }
    };

    loadTableForm().then(() => console.log('Loaded table row list'));
  }, [dispatch, api, optionList, setPage, userDetails.id]);

  return (
    <div
      key={`${tableName}-table-${randomCode(7)}`}
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
          <Table
            columnList={table.columnList}
            rowList={table.rowList}
            actionList={actionList?.filter((action) =>
              action.optionIdList.find(
                (optionId) => optionId === optionList.find((option) => option.isSelected).id
              )
            )}
          />
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
