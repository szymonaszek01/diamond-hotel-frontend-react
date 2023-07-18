import {useState} from "react";

import {close, logo, menu} from "../assets";
import {navLinks} from "../constants";

const Navbar = ({page, isToggled}) => {
  const [active, setActive] = useState(page)
  const [toggle, setToggle] = useState(isToggled)
  const renderMobileView = () => {
    return !isToggled ? '' : (
      <div className="sm:hidden flex flex-1 justify-end items-center">
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
            {navLinks.find(nav => nav.main.title === page)?.sections.map((section, index) => (
              <li
                key={section.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] mb-4 ${
                  active === section.title ? "text-white" : "text-dimWhite"}`}
                onClick={() => setActive(section.title)}
              >
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
            {navLinks.filter(nav => nav.main.title !== page && page).map((nav, index) => (
              <li
                key={nav.main.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.main.title ? "text-white" : "text-dimWhite"} ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.main.title)}
              >
                <a href={nav.main.path}>{nav.main.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={logo} alt="hoobank" className="w-[175px] h-[21px]"/>

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.find(nav => nav.main.title === page)?.sections.map((section, index) => (
          <li
            key={section.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] mr-10 ${
              active === section.title ? "text-white" : "text-dimWhite"} ${index === 0 ? "ml-10" : "ml-0"}`}
            onClick={() => setActive(section.title)}
          >
            <a href={`#${section.id}`}>{section.title}</a>
          </li>
        ))}
        {navLinks.filter(nav => nav.main.title !== page && page).map((nav, index) => (
          <li
            key={nav.main.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.main.title ? "text-white" : "text-dimWhite"} ${index === 0 ? "ml-0" : "ml-10"}`}
            onClick={() => setActive(nav.main.title)}
          >
            <a href={nav.main.path}>{nav.main.title}</a>
          </li>
        ))}
      </ul>

      {renderMobileView()}
    </nav>
  )
}

export default Navbar
