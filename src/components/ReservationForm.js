import { useEffect, useState } from 'react';
import { toReservationTableMapper } from '../redux/features/reservation/reservationMapper';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserDetails } from '../redux/features/user/userSlice';
import { useGetReservationListByUserProfileIdMutation } from '../redux/api/reservationApiSlice';
import { ButtonWithIcon, CustomLoadingOverlay, Table, TableSlider } from './index';
import { randomCode } from '../util';
import { moreArrow } from '../assets';
import {
  selectReservationList,
  selectReservationPage,
  setReservationList,
} from '../redux/features/reservation/reservationSlice';

const ReservationForm = () => {
  const userDetails = useSelector(selectUserDetails);
  const reservationListFromState = useSelector(selectReservationList);
  const reservationPageFromState = useSelector(selectReservationPage);
  const dispatch = useDispatch();
  const { columnList, rowList } = toReservationTableMapper(reservationListFromState);

  const [page, setPage] = useState(reservationPageFromState);
  const [reservationTable, setReservationTable] = useState({
    columnList: columnList,
    rowList: rowList,
    actionList: [],
  });
  const [optionList, setOptionList] = useState([
    {
      id: 0,
      label: 'All',
      queryParamName: '',
      value: '',
      isSelected: true,
    },
    {
      id: 1,
      label: 'Approved',
      queryParamName: 'payment-status',
      value: 'approved',
      isSelected: false,
    },
    {
      id: 2,
      label: 'Waiting for payment',
      queryParamName: 'payment-status',
      value: 'waiting-for-payment',
      isSelected: false,
    },
  ]);

  const [getReservationListByUserProfileId, { isLoading }] =
    useGetReservationListByUserProfileIdMutation();

  useEffect(() => {
    const loadReservationListByUserProfileId = async () => {
      try {
        const selectedOption = optionList.find((option) => option.isSelected);
        if (!selectedOption) {
          return;
        }

        let filters = { page: page ?? 0, size: 5 };
        if (selectedOption.queryParamName.length > 0 && selectedOption.value.length > 0) {
          filters = { ...filters, [selectedOption.queryParamName]: selectedOption.value };
        }

        const response = await getReservationListByUserProfileId({
          userProfileId: userDetails.id,
          filters: filters,
        }).unwrap();

        const { columnList, rowList } = toReservationTableMapper(response);
        let newRowList = reservationTable.rowList;
        if (rowList.length < 1) {
          return;
        }

        dispatch(setReservationList({ all: response, page: page }));
        newRowList = newRowList.concat(rowList);
        setReservationTable({
          ...reservationTable,
          columnList: columnList,
          rowList: page === 0 ? rowList : newRowList,
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (reservationTable.columnList.length < 1) {
      loadReservationListByUserProfileId().then(() => console.log('Loaded reservation list'));
    }
  }, [
    dispatch,
    getReservationListByUserProfileId,
    optionList,
    page,
    reservationTable,
    userDetails.id,
  ]);

  return isLoading ? (
    <CustomLoadingOverlay message={'Loading...'} />
  ) : (
    <div
      key={`reservation-table-${randomCode(7)}`}
      className="flex flex-col w-full items-center justify-center mt-8">
      <div className={'flex flex-col items-start justify-center w-full gap-8'}>
        <TableSlider
          optionList={optionList}
          setOptionList={setOptionList}
          setPage={setPage}
          itemWidth={'170px'}
        />
        {reservationTable.rowList.length ? (
          <p className={`text-sm text-dimWhite font-poppins font-thin break-all ml-2 leading-7`}>
            <strong className={'text-sm font-semibold text-white'}>Reservation Details</strong>
            <br />
            Below, you'll find a list of your confirmed reservations, including key information such
            as reservation numbers, dates, and accommodation details.
          </p>
        ) : (
          <p className={`text-sm text-dimWhite font-poppins font-thin break-all ml-2 leading-7`}>
            <strong className={'text-sm font-semibold text-white'}>Empty reservation list</strong>
            <br />
            Please, book a room and see the details.
          </p>
        )}
        {reservationTable.rowList.length > 0 ? (
          <Table
            columnList={reservationTable.columnList}
            rowList={reservationTable.rowList}
            actionList={reservationTable.actionList}
          />
        ) : (
          ''
        )}
        {reservationTable.rowList.length > 0 ? (
          <div className={reservationTable.rowList.length % 5 !== 0 ? 'hidden' : ''}>
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

export default ReservationForm;
