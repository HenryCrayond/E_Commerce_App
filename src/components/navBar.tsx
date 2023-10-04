import HomeIcon from "../assets/homeIcon";
import { AboutIcon } from "../assets/aboutIcon";
import { ConductIcon } from "../assets/conductIcon";
import { MenuIcon } from "../assets/menuIcon";


const Navbar = () => {
  return (
    <>
      <div className="flex justify-between items-center" id="open">
        <h1 className="font-bold uppercase p-4 text-gray-600 font-serif">
          <a href="/">Electronic shop</a>
        </h1>
        <div className="cursor-pointer md:hidden m-4" id="open">
         <MenuIcon/>
        </div>
      </div>
      <ul className="text-sm hidden md:block" id="menu">
        <li
          className="flex justify-center cursor-pointer gap-4 mb-6 border-r-4 border-lime-500 font-serif text-gray-700 text-sm"
          id="item_home"
        >
          <HomeIcon />
          <a href="/">
            <span>Home</span>
          </a>
        </li>
        <li
          className="flex justify-center cursor-pointer gap-4 mb-6 border-r-4 border-white font-serif text-gray-700 text-sm"
          id="item_about"
        >
          <AboutIcon />
          <a href="/">
            <span>About</span>
          </a>
        </li>
        <li
          className="flex justify-center cursor-pointer gap-4 mb-6 border-r-4 border-white font-serif text-gray-700 text-sm"
          id="item_conduct"
        >
          <ConductIcon />
          <a href="/">
            <span>Conduct</span>
          </a>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
