import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSearchPage = location.pathname === "/search";

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 flex items-center gap-2 rounded-lg border px-2 text-neutral-500 bg-white group focus-within:border-[#ffbf00]">
      
      {/* Search Icon */}
      <button
        className="flex items-center justify-center h-full px-2 cursor-pointer group-focus-within:text-[#ffbf00]"
      >
        <IoSearch size={20} />
      </button>

      <div className="w-full h-full">
        {!isSearchPage ? (
          <div
            onClick={redirectToSearchPage}
            className="h-full w-full flex items-center overflow-hidden cursor-text"
          >
            <TypeAnimation
              sequence={[
                "Search milk", 1000,
                "Search bread", 1000,
                "Search fruits", 1000,
                "Search vegetables", 1000,
                "Search curd", 1000,
                "Search eggs", 1000,
                "Search butter", 1000,
                "Search cheese", 1000,
                "Search rice", 1000,
                "Search chips", 1000,
                "Search wheat flour", 1000,
                "Search cooking oil", 1000,
                "Search sugar", 1000,
                "Search salt", 1000,
                "Search snacks", 1000,
                "Search chocolates", 1000,
                "Search soft drinks", 1000,
                "Search ice cream", 1000,
                "Search instant noodles", 1000,
                "Search tea", 1000,
                "Search coffee", 1000,
              ]}
              speed={50}
              repeat={Infinity}
              wrapper="span"
              className="text-sm md:text-base text-neutral-500 whitespace-nowrap"
            />
          </div>
        ) : (
          <input
            type="text"
            placeholder="Search for atta daal and more."
            autoFocus
            className="bg-transparent w-full h-full outline-none text-black"
          />
        )}
      </div>
    </div>
  );
};

export default Search;