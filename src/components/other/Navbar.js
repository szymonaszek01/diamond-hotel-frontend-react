import { useState } from 'react';

import { close, close2, logo, logo2, menu, menu2 } from '../../assets';
import { logOut } from '../../redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';

const Navbar = ({ page, isToggled, navbarLinks, logoWhite, textWhite, fullAccess }) => {
  const [toggle, setToggle] = useState(isToggled);
  const dispatch = useDispatch();

  const logOutUser = (id) => {
    if (id === 'log-out') {
      dispatch(logOut());
    }
  };

  const renderMobileView = () => {
    return !isToggled ? (
      ''
    ) : (
      <div className="sm:hidden flex justify-end items-center ml-4">
        <img
          src={toggle ? (textWhite ? close : close2) : textWhite ? menu : menu2}
          alt="menu"
          className="w-[23px] h-[23px]"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? 'hidden' : 'flex'
          } p-6 bg-transparent absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar bg-black-gradient`}>
          <ul className="list-none flex justify-end items-start flex-1 flex-col ul-navbar">
            {navbarLinks
              ?.find((nav) => nav.main.title === page && fullAccess)
              ?.sections.map((section) => (
                <li
                  key={section.id}
                  className={`font-poppins font-medium cursor-pointer text-white text-[14px]`}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            {navbarLinks
              ?.filter(
                (nav) =>
                  nav.main.title !== page &&
                  page &&
                  (fullAccess ||
                    (!fullAccess &&
                      (nav.main.id === 'log-out' ||
                        nav.main.id === 'dashboard' ||
                        nav.main.id === 'settings')))
              )
              .map((nav) => (
                <li
                  key={nav.main.id}
                  className={`font-poppins font-medium cursor-pointer text-[14px] text-white`}>
                  <a href={nav.main.path} onClick={() => logOutUser(nav.main.id)}>
                    {nav.main.title}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <nav className={`w-full flex py-4 justify-between items-center navbar relative z-50`}>
      <img src={logoWhite ? logo : logo2} alt="hoobank" className="w-[175px] h-[21px]" />
      <ul className={`list-none sm:flex hidden justify-end items-center flex-1`}>
        {navbarLinks
          ?.find((nav) => nav.main.title === page && fullAccess)
          ?.sections.map((section, index) => (
            <li
              key={section.id}
              className={`font-poppins font-normal cursor-pointer text-xs mr-10 ${
                textWhite ? 'text-white' : 'text-black'
              } ${index === 0 ? 'ml-10' : 'ml-0'}`}>
              <a href={`#${section.id}`}>{section.title}</a>
            </li>
          ))}
        {navbarLinks
          ?.filter(
            (nav) =>
              nav.main.title !== page &&
              page &&
              (fullAccess ||
                (!fullAccess &&
                  (nav.main.id === 'log-out' ||
                    nav.main.id === 'dashboard' ||
                    nav.main.id === 'settings')))
          )
          .map((nav, index) => (
            <li
              key={nav.main.id}
              className={`font-poppins font-normal rounded-[10px] cursor-pointer text-xs ${
                textWhite ? 'text-white' : 'text-black'
              } ${index === 0 ? 'ml-0' : 'ml-10'}`}>
              <a href={nav.main.path} onClick={() => logOutUser(nav.main.id)}>
                {nav.main.title}
              </a>
            </li>
          ))}
      </ul>

      {renderMobileView()}
    </nav>
  );
};

export default Navbar;
