import logo from "../assets/logo.png";
import Search from "./Search";
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <header className="h-20 shadow-md sticky top-0 bg-white z-50">
      <div className="container mx-auto flex items-center h-full px-4 justify-between">
        
        {/* Logo - Left */}
        <Link to={"/"} className="flex items-center h-full">
          <img
            src={logo}
            width={170}
            height={60}
            alt="logo"
            className="hidden lg:block"
          />
          <img
            src={logo}
            width={170}
            height={60}
            alt="logo"
            className="hidden lg:hidden"
          />
        </Link>

        {/* Search - Center */}
        <div className="flex-1 flex justify-center px-4">
          <Search />
        </div>

        {/* Login - Right */}
        <div className="flex items-center">
          <button className="text-gray-700 hover:text-primary-200 transition-colors">
            Login and my cart
          </button>
        </div>

      </div>

    </header>
  );
};

export default Header;
