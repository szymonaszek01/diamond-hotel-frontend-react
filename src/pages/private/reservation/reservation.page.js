import styles from '../../../style';
import {
  CancelOrPayAction,
  Footer,
  Navbar,
  PageFormSelector,
  PdfAction,
  RoomTypeDetailsAction,
  TableForm,
} from '../../../components';
import { privateNavLinks, role } from '../../../constants';
import { useEffect, useState } from 'react';
import {
  useCountReservationListByUserProfileIdMutation,
  useCountReservationListMutation,
  useDeleteReservationByIdMutation,
  useGetReservationListByUserProfileIdMutation,
  useGetReservationListMutation,
  useGetReservationPdfDocumentByIdMutation,
  useUpdateReservationPaymentMutation,
} from '../../../redux/api/reservationApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserDetails } from '../../../redux/features/user/userSlice';
import { updateOptionList } from '../../../util';
import {
  useCountPaymentListByUserProfileIdMutation,
  useCountPaymentListMutation,
  useGetPaymentListByUserProfileIdMutation,
  useGetPaymentListMutation,
  useGetPaymentPdfDocumentByIdMutation,
} from '../../../redux/api/paymentApiSlice';
import {
  useCountReservedRoomListByUserProfileIdMutation,
  useCountReservedRoomListMutation,
  useGetReservedRoomListByUserProfileIdMutation,
  useGetReservedRoomListMutation,
} from '../../../redux/api/reservedRoomApi';
import { toReservationTableMapper } from '../../../redux/features/reservation/reservationMapper';
import { toReservedRoomTableMapper } from '../../../redux/features/reservedRoom/reservedRoomMapper';
import { toPaymentTableMapper } from '../../../redux/features/payment/paymentMapper';
import { selectFullAccess } from '../../../redux/features/auth/authSlice';
import ReservationFilters from './ReservationFilters';

const ReservationPage = () => {
  const fullAccess = useSelector(selectFullAccess);
  const userDetails = useSelector(selectUserDetails);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  const navConfig = {
    page: 'Reservations',
    isToggled: true,
    navbarLinks: privateNavLinks,
    logoWhite: true,
    textWhite: true,
    fullAccess: fullAccess,
  };

  // Table
  const [countReservationList] = useCountReservationListMutation();
  const [countReservedRoomList] = useCountReservedRoomListMutation();
  const [countPaymentList] = useCountPaymentListMutation();
  const [countReservationListByUserProfileId] = useCountReservationListByUserProfileIdMutation();
  const [countReservedRoomListByUserProfileId] = useCountReservedRoomListByUserProfileIdMutation();
  const [countPaymentListByUserProfileId] = useCountPaymentListByUserProfileIdMutation();

  // Page form selectors
  const [getReservationList] = useGetReservationListMutation();
  const [getReservedRoomList] = useGetReservedRoomListMutation();
  const [getPaymentList] = useGetPaymentListMutation();
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
      tableText: `Below, you'll find a list of your reservations.`,
      mapper: (res) => toReservationTableMapper(res, userDetails.role),
      apiPageFormSelector: async ({ userProfileId }) =>
        userDetails.role === role.admin
          ? await countReservationList()
          : await countReservationListByUserProfileId({ userProfileId }),
      apiTableForm: async ({ userProfileId, filters, sort }) =>
        userDetails.role === role.admin
          ? await getReservationList({ filters, sort })
          : await getReservationListByUserProfileId({ userProfileId, filters, sort }),
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
          form: ({ requiredCellList }) => {
            const name = requiredCellList.find(
              (requiredCell) => requiredCell.name === 'Room type'
            )?.value;
            return <RoomTypeDetailsAction name={name} />;
          },
        },
      ],
      tableSliderCardWidth: '170px',
      tableText: `Below, you'll find a list of your reserved rooms.`,
      mapper: (res) => toReservedRoomTableMapper(res, userDetails.role),
      apiPageFormSelector: async ({ userProfileId }) =>
        userDetails.role === role.admin
          ? await countReservedRoomList()
          : await countReservedRoomListByUserProfileId({ userProfileId }),
      apiTableForm: async ({ userProfileId, filters, sort }) =>
        userDetails.role === role.admin
          ? await getReservedRoomList({ filters, sort })
          : await getReservedRoomListByUserProfileId({ userProfileId, filters, sort }),
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
      tableText: `Below, you'll find a list of your payments.`,
      mapper: (res) => toPaymentTableMapper(res, userDetails.role),
      apiPageFormSelector: async ({ userProfileId }) =>
        userDetails.role === role.admin
          ? await countPaymentList()
          : await countPaymentListByUserProfileId({ userProfileId }),
      apiTableForm: async ({ userProfileId, filters, sort }) =>
        userDetails.role === role.admin
          ? await getPaymentList({ filters, sort })
          : await getPaymentListByUserProfileId({ userProfileId, filters, sort }),
    },
  ]);

  const [tableSliderOptionList, setTableSliderOptionList] = useState([
    {
      id: 1,
      label: 'All',
      queryParamName: 'payment_status',
      value: '',
      isSelected: true,
    },
    {
      id: 2,
      label: 'Approved',
      queryParamName: 'payment_status',
      value: 'approved',
      isSelected: false,
    },
    {
      id: 3,
      label: 'Waiting for payment',
      queryParamName: 'payment_status',
      value: 'waiting-for-payment',
      isSelected: false,
    },
  ]);

  const [advancedFilters, setAdvancedFilters] = useState({
    minDate: { queryParamName: 'min_date', value: '' },
    maxDate: { queryParamName: 'max_date', value: '' },
    userProfileEmail: { queryParamName: 'user_profile_email', value: '' },
    flightNumber: { queryParamName: 'flight_number', value: '' },
    minPaymentCost: { queryParamName: 'min_payment_cost', value: '' },
    maxPaymentCost: { queryParamName: 'max_payment_cost', value: '' },
    paymentCharge: { queryParamName: 'payment_charge', value: '' },
    roomTypeName: { queryParamName: 'room_type_name', value: '' },
  });

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
    <div className={`${styles.page} px-6 sm:px-16`}>
      <div className={`${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar {...navConfig} />
        </div>
      </div>
      <div className="flex flex-col w-full items-center justify-center mt-8">
        <div
          className={
            'flex flex-col items-center text-center sm:text-start sm:items-start justify-center w-[80%] gap-8'
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
              You can view and manage all your upcoming reservations with Diamond hotel. If you want
              to make changes or check details about your bookings, you should definitely stay here.
            </span>
          </p>
          <p
            className={`flex flex-col text-sm text-dimWhite font-poppins font-thin ml-2 leading-10 sm:leading-8`}>
            <span className={'text-2xl font-semibold text-white leading-[50px] sm:leading-8'}>
              Manage Your Reservations
            </span>
            <span className={'mt-2'}>
              You can update your reservation list by clicking three dots in each row:
            </span>
            <ul className={'text-white mt-5'}>
              <li className={'li-circle'}>
                <strong className={'text-sm font-semibold text-gradient'}>
                  View reserved room details:
                </strong>{' '}
                See all the details of your reserved room, including equipment, pricing and
                capacity.
              </li>
              <li className={'li-circle'}>
                <strong className={'text-sm font-semibold text-gradient'}>
                  Pay or cancel your reservation:
                </strong>{' '}
                If it is necessary, cancel selected reservation or pay for it.
              </li>
              <li className={'li-circle'}>
                <strong className={'text-sm font-semibold text-gradient'}>Get PDF report:</strong>{' '}
                Download reservation summary to have all important details in one document.
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
                setAdvancedFilters={setAdvancedFilters}
                advancedFilters={advancedFilters}
                advancedFiltersElement={
                  <ReservationFilters setAdvancedFilters={setAdvancedFilters} />
                }
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
