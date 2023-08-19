import {useState} from "react";

import {close, logo, menu} from "../assets";
import {logOut} from "../redux/features/authSlice";
import {useDispatch} from "react-redux";

const Navbar = ({page, isToggled, navbarLinks}) => {
  const [toggle, setToggle] = useState(isToggled)
  const dispatch = useDispatch()

  const logOutUser = (id) => {
    if (id === 'log-out') {
      dispatch(logOut())
    }
  }

  const renderMobileView = () => {
    return !isToggled ? '' : (
      <div className="relative sm:hidden flex flex-1 justify-end items-center z-[99]">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navbarLinks?.find(nav => nav.main.title === page)?.sections.map((section, _) => (
              <li
                key={section.id}
                className={`font-poppins font-medium cursor-pointer text-[14px] mb-4 text-white`}
              >
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
            {navbarLinks?.filter(nav => nav.main.title !== page && page).map((nav, index) => (
              <li
                key={nav.main.id}
                className={`font-poppins font-medium cursor-pointer text-[14px] text-white ${index === navbarLinks?.length - 1 ? "mb-0" : "mb-4"}`}
              >
                <a href={nav.main.path} onClick={() => logOutUser(nav.main.id)}>{nav.main.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar relative z-[55]">
      <img src={logo} alt="hoobank" className="w-[175px] h-[21px]"/>
      <ul className={`list-none sm:flex hidden justify-end items-center flex-1`}>
        {navbarLinks?.find(nav => nav.main.title === page)?.sections.map((section, index) => (
          <li
            key={section.id}
            className={`font-poppins font-normal cursor-pointer text-[14px] mr-10 text-white ${index === 0 ? "ml-10" : "ml-0"}`}
          >
            <a href={`#${section.id}`}>{section.title}</a>
          </li>
        ))}
        {navbarLinks?.filter(nav => nav.main.title !== page && page).map((nav, index) => (
          <li
            key={nav.main.id}
            className={`font-poppins font-normal cursor-pointer text-[14px] text-white ${index === 0 ? "ml-0" : "ml-10"}`}
          >
            <a href={nav.main.path} onClick={() => logOutUser(nav.main.id)}>{nav.main.title}</a>
          </li>
        ))}
      </ul>

      {renderMobileView()}
    </nav>
  )
}

export default Navbar
