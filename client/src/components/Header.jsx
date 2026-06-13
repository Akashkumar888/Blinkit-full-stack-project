import logo from "../assets/logo.png";
import Search from "./Search";
import { Link } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";

const Header = () => {
  return (
    <header className="h-24 lg:h-20 shadow-md sticky top-0 bg-white z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="logo"
            width={170}
            height={60}
            className="hidden lg:block"
          />

          <img
            src={logo}
            alt="logo"
            width={120}
            height={40}
            className="block lg:hidden"
          />
        </Link>

        {/* Desktop Search */}
        <div className="hidden lg:flex flex-1 justify-center px-4">
          <Search />
        </div>

        {/* User Section */}
        <div className="flex items-center">
          <button className="text-neutral-600 lg:hidden">
            <FaRegCircleUser size={26} />
          </button>

          <div className="hidden lg:block text-gray-700 hover:text-yellow-500 transition-colors">
            Login and My Cart
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;