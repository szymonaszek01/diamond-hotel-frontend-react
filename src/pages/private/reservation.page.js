import styles from '../../style';
import {
  CancelOrPayAction,
  Footer,
  Navbar,
  PageFormSelector,
  PdfAction,
  RoomTypeDetailsAction,
  TableForm,
} from '../../components';
import { privateNavLinks } from '../../constants';
import { useEffect, useState } from 'react';
import {
  useCountReservationListByUserProfileIdMutation,
  useDeleteReservationByIdMutation,
  useGetReservationListByUserProfileIdMutation,
  useGetReservationPdfDocumentByIdMutation,
  useUpdateReservationPaymentMutation,
} from '../../redux/api/reservationApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserDetails } from '../../redux/features/user/userSlice';
import { updateOptionList } from '../../util';
import {
  useCountPaymentListByUserProfileIdMutation,
  useGetPaymentListByUserProfileIdMutation,
  useGetPaymentPdfDocumentByIdMutation,
} from '../../redux/api/paymentApiSlice';
import {
  useCountReservedRoomListByUserProfileIdMutation,
  useGetReservedRoomListByUserProfileIdMutation,
} from '../../redux/api/reservedRoomApi';
import { toReservationTableMapper } from '../../redux/features/reservation/reservationMapper';
import { toReservedRoomTableMapper } from '../../redux/features/reservedRoom/reservedRoomMapper';
import { toPaymentTableMapper } from '../../redux/features/payment/paymentMapper';

const ReservationPage = () => {
  const navConfig = {
    page: 'Reservation list',
    isToggled: true,
    navbarLinks: privateNavLinks,
    logoWhite: true,
    textWhite: true,
  };

  const userDetails = useSelector(selectUserDetails);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  // Table
  const [countReservationListByUserProfileId] = useCountReservationListByUserProfileIdMutation();
  const [countReservedRoomListByUserProfileId] = useCountReservedRoomListByUserProfileIdMutation();
  const [countPaymentListByUserProfileId] = useCountPaymentListByUserProfileIdMutation();

  // Page form selectors
  const [getReservationListByUserProfileId] = useGetReservationListByUserProfileIdMutation();
  const [getReservedRoomListByUserProfileId] = useGetReservedRoomListByUserProfileIdMutation();
  const [getPaymentListByUserProfileId] = useGetPaymentListByUserProfileIdMutation();

  // Action list
  const [getReservationPdfDocumentById] = useGetReservationPdfDocumentByIdMutation();
  const [getPaymentPdfDocumentById] = useGetPaymentPdfDocumentByIdMutation();
  const [deleteReservationById] = useDeleteReservationByIdMutation();
  const [updateReservationPayment] = useUpdateReservationPaymentMutation();

  const [pageForm, setPageForm] = useState([
    {
      id: 1,
      name: 'reservation',
      label: 'Reservations',
      value: 0,
      isSelected: true,
      tableActionList: [
        {
          optionIdList: [1, 2, 3],
          excluded: [],
          parameterList: [],
          api: async ({ id }) => await getReservationPdfDocumentById({ id }),
          form: ({ id, api }) => <PdfAction id={id} api={api} />,
        },
        {
          optionIdList: [1, 2, 3],
          excluded: [],
          parameterList: [],
          api: async ({ id }) => await deleteReservationById({ id }),
          form: ({ id, api }) => (
            <CancelOrPayAction name={'reservation'} minDays={7} type={'cancel'} id={id} api={api} />
          ),
        },
        {
          optionIdList: [1, 3],
          excluded: [{ name: 'Status', value: 'Approved' }],
          parameterList: [],
          api: async ({ id, token }) =>
            await updateReservationPayment({ id, paymentToken: token.id }),
          form: ({ id, api }) => (
            <CancelOrPayAction name={'reservation'} minDays={7} type={'pay'} id={id} api={api} />
          ),
        },
      ],
      tableSliderCardWidth: '170px',
      tableText:
        "Below, you'll find a list of your confirmed reservations, including key information such\n" +
        '            as reservation numbers, dates, and accommodation details.',
      mapper: (res) => toReservationTableMapper(res),
      apiPageFormSelector: async ({ userProfileId }) =>
        await countReservationListByUserProfileId({ userProfileId }),
      apiTableForm: async ({ userProfileId, filters, sort }) =>
        await getReservationListByUserProfileId({ userProfileId, filters, sort }),
    },
    {
      id: 2,
      name: 'reserved-room',
      label: 'Reserved rooms',
      value: 0,
      isSelected: false,
      tableActionList: [
        {
          optionIdList: [1, 2, 3],
          excluded: [],
          parameterList: ['Room type'],
          api: undefined,
          form: ({ requiredCellList }) => (
            <RoomTypeDetailsAction
              name={
                requiredCellList.find((requiredCell) => requiredCell.name === 'Room type')?.value
              }
            />
          ),
        },
      ],
      tableSliderCardWidth: '170px',
      tableText:
        "Below, you'll find a list of your confirmed room reservations, including key information\n" +
        '            such as reservation id, room number and other details.\n',
      mapper: (res) => toReservedRoomTableMapper(res),
      apiPageFormSelector: async ({ userProfileId }) =>
        await countReservedRoomListByUserProfileId({ userProfileId }),
      apiTableForm: async ({ userProfileId, filters, sort }) =>
        await getReservedRoomListByUserProfileId({ userProfileId, filters, sort }),
    },
    {
      id: 3,
      name: 'payment',
      label: 'Payments',
      value: 0,
      isSelected: false,
      tableActionList: [
        {
          optionIdList: [1, 2, 3],
          excluded: [],
          parameterList: [],
          api: async ({ id }) => await getPaymentPdfDocumentById({ id }),
          form: ({ id, api }) => <PdfAction id={id} api={api} />,
        },
      ],
      tableSliderCardWidth: '170px',
      tableText:
        "Below, you'll find a list of your recent payments and transactions, including key\n" +
        '            information such as payment dates, amounts, and payment statuses.',
      mapper: (res) => toPaymentTableMapper(res),
      apiPageFormSelector: async ({ userProfileId }) =>
        await countPaymentListByUserProfileId({ userProfileId }),
      apiTableForm: async ({ userProfileId, filters, sort }) =>
        await getPaymentListByUserProfileId({ userProfileId, filters, sort }),
    },
  ]);

  const [tableSliderOptionList, setTableSliderOptionList] = useState([
    {
      id: 1,
      label: 'All',
      queryParamName: '',
      value: '',
      isSelected: true,
    },
    {
      id: 2,
      label: 'Approved',
      queryParamName: 'payment-status',
      value: 'approved',
      isSelected: false,
    },
    {
      id: 3,
      label: 'Waiting for payment',
      queryParamName: 'payment-status',
      value: 'waiting-for-payment',
      isSelected: false,
    },
  ]);

  useEffect(() => {
    const loadPageFormSelector = () => {
      for (const tableOption of pageForm) {
        tableOption
          .apiPageFormSelector({
            userProfileId: userDetails.id,
          })
          .then((response) => {
            updateOptionList({
              optionList: pageForm,
              setOptionList: setPageForm,
              selectedId: tableOption.id,
              key: 'value',
              newValue: response?.data,
              previousValue: tableOption.value,
              updatingApi: true,
            });
          })
          .catch((error) => console.log(error));
      }
    };

    loadPageFormSelector();
  }, [dispatch, userDetails.id]);

  return (
    <div className={`${styles.page}`}>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar {...navConfig} />
        </div>
      </div>
      <div className="flex flex-col w-full items-center justify-center mt-8">
        <div
          className={
            'flex flex-col items-center text-center sm:text-start sm:items-start justify-center w-[60%] gap-8'
          }>
          <PageFormSelector
            optionList={pageForm}
            setOptionList={setPageForm}
            cardWidth={'200px'}
            setPage={(value) => setPage(value)}
          />
          <p
            className={`flex flex-col gap-2 text-sm text-dimWhite font-poppins font-thin ml-2 leading-10 sm:leading-8`}>
            <span className={'text-2xl font-semibold text-white leading-[50px] sm:leading-8'}>
              Your Reservations
            </span>
            <span>
              Welcome to your reservation list. Here, you can view and manage all your upcoming
              reservations with Diamond hotel. Whether you're checking in, making changes, or need
              more details about your bookings, it's all right here.
            </span>
          </p>
          <p
            className={`flex flex-col text-sm text-dimWhite font-poppins font-thin ml-2 leading-10 sm:leading-8`}>
            <span className={'text-2xl font-semibold text-white leading-[50px] sm:leading-8'}>
              Manage Your Reservations
            </span>
            <span className={'mt-2'}>
              For each reservation listed, you'll have options to manage your booking. Here are some
              common actions:
            </span>
            <ul className={'text-white mt-5'}>
              <li className={'li-circle'}>
                <strong className={'text-sm font-semibold text-gradient'}>View Details:</strong>{' '}
                Click to see all the details of your reservation, including room types, special
                requests, and pricing information.
              </li>
              <li className={'li-circle'}>
                <strong className={'text-sm font-semibold text-gradient'}>
                  Modify Reservation:
                </strong>{' '}
                If you need to change your check-in or check-out dates, update guest information, or
                make other modifications, you can do so through the "Modify Reservation" link.
              </li>
              <li className={'li-circle'}>
                <strong className={'text-sm font-semibold text-gradient'}>
                  Cancel Reservation:
                </strong>{' '}
                If your plans have changed and you need to cancel a reservation, you can do so by
                clicking on the "Cancel Reservation" link.
              </li>
            </ul>
          </p>
          {pageForm
            .filter((form) => form.isSelected)
            .map((form) => (
              <TableForm
                tableName={form.name}
                optionList={tableSliderOptionList}
                setOptionList={setTableSliderOptionList}
                optionCardWidth={form.tableSliderCardWidth}
                api={form.apiTableForm}
                actionList={form.tableActionList}
                toTableMapper={form.mapper}
                text={form.tableText}
                page={page}
                setPage={(value) => setPage(value)}
              />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReservationPage;
