import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import {BsCart4} from "react-icons/bs"
import useMobile from "../hooks/useMobile";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();

  const navigate=useNavigate();
  const redirectToLoginPage=()=>{
    navigate("/login");
  }
  const isSearchPage = location.pathname === "/search";


  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">

      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-2 justify-between">

          {/* Logo */}
          <div className="h-full">
            <Link
              to="/"
              className="h-full flex justify-center items-center"
            >
              <img
                src={logo}
                width={170}
                height={60}
                alt="logo"
                className="hidden lg:block"
              />

              <img
                src={logo}
                width={120}
                height={60}
                alt="logo"
                className="lg:hidden"
              />
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:block">
            <Search />
          </div>

          {/* User Section */}
          <div className="">
            {/* user icons display in only mobile version  */}
            <button className="text-neutral-600 lg:hidden">
              <FaRegCircleUser size={26} />
            </button>

            <div className="hidden lg:flex items-center gap-10">
              {/* Desktop  */}
              <button onClick={redirectToLoginPage} className="text-lg px-2 cursor-pointer ">
                Login 
              </button>
              <button className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-3 rounded text-white ">
                {/* add to cart icons  */}
                <div className="animate-bounce">
                 <BsCart4 size={26}/>
                </div>
                <div className="font-semibold">
                   <p>My Cart</p>
                  

                </div>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Mobile Search */}
      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>

    </header>
  );
};

export default Header;