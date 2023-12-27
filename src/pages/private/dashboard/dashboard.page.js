import styles from '../../../style';
import { isConfirmed, selectFullAccess } from '../../../redux/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { privateNavLinks, role } from '../../../constants';
import { Footer, Navbar } from '../../../components';
import UserDetailsCard from './UserDetailsCard';
import FindRoomCard from './FindRoomCard';
import WeatherCard from './WeatherCard';
import { selectUserRole } from '../../../redux/features/user/userSlice';
import AddRoomCard from './AddRoomCard';
import { useEffect } from 'react';
import { setRoomTypeList } from '../../../redux/features/roomType/roomTypeSlice';
import {
  useGetRoomTypeEquipmentMutation,
  useGetRoomTypeListMutation,
} from '../../../redux/api/roomTypeApiSlice';
import { toRoomTypeListMapper } from '../../../redux/features/roomType/roomTypeMapper';
import RoomCard from './RoomCard';
import CheckStatisticsCard from './CheckStatisticsCard';

const DashboardPage = () => {
  const confirmed = useSelector(isConfirmed);
  const fullAccess = useSelector(selectFullAccess);
  const userRole = useSelector(selectUserRole);
  const dispatch = useDispatch();

  const navConfig = {
    page: 'Home',
    isToggled: confirmed,
    navbarLinks: privateNavLinks,
    logoWhite: false,
    textWhite: false,
    fullAccess: fullAccess,
  };

  const [getRoomTypeList] = useGetRoomTypeListMutation();
  const [getRoomTypeEquipment] = useGetRoomTypeEquipmentMutation();

  useEffect(() => {
    let response;
    let roomTypeList;

    const loadRoomTypeList = async () => {
      try {
        response = await getRoomTypeList().unwrap();
        roomTypeList = toRoomTypeListMapper(response);
      } catch (error) {
        console.log('Failed to load room types');
      }
    };

    const loadRoomTypeEquipment = async () => {
      for (const roomType of roomTypeList) {
        try {
          response = await getRoomTypeEquipment({ id: roomType.id }).unwrap();
          roomType['equipment'] = response;
        } catch (error) {
          console.log(`Failed to load ${roomType.name} equipment`);
        }
      }
      dispatch(setRoomTypeList({ all: roomTypeList }));
    };

    loadRoomTypeList().then(() => {
      loadRoomTypeEquipment().then(() => console.log('Loaded room type list with equipment'));
    });
  }, [dispatch, getRoomTypeEquipment, getRoomTypeList]);

  return (
    <div className={`${styles.page} bg-white`}>
      <div className={`${styles.flexCenter} bg-[#FFFFFF] w-full`}>
        <div className={`${styles.boxWidth} px-6 sm:px-16`}>
          <Navbar {...navConfig} />
          <div className="absolute rotate-180 z-[0] left-0 w-full">
            <svg
              className="waves"
              viewBox="0 10 30 40"
              preserveAspectRatio="none"
              shapeRendering="auto">
              <defs>
                <path
                  id="gentle-wave"
                  d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                />
              </defs>
              <g className="parallax">
                <use xlinkHref="#gentle-wave" x="155" y="5" fill="#FFFFFF" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className={`bg-black-gradient ${styles.flexCenter} z-99`}>
        <div className={`${styles.boxWidth} mb-20`}>
          <div className={`${styles.flexCenter} flex-col z-[99] sm:relative`}>
            <div className={`w-[80%] sm:w-[60%] mt-8 flex flex-col gap-28`}>
              <UserDetailsCard allRequiredData={true} />
              {userRole === role.admin ? <RoomCard /> : ''}
              {userRole === role.admin ? <AddRoomCard /> : <FindRoomCard />}
              {userRole === role.admin ? <CheckStatisticsCard /> : ''}
              <WeatherCard />
            </div>
          </div>
        </div>
      </div>
      <div className={`w-full px-6 sm:px-16`}>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardPage;
