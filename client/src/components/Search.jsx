import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { TypeAnimation } from "react-type-animation";

import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();

   const { isMobile } = useMobile();

  const isSearchPage =
    location.pathname === "/search";

  const searchParams = new URLSearchParams(
    location.search
  );

  const query =
    searchParams.get("q") || "";

  const [search, setSearch] =
    useState(query);

  useEffect(() => {
    setSearch(query);
  }, [query]);

  const redirectToSearchPage =
    useCallback(() => {
      navigate("/search");
    }, [navigate]);

  const handleChange =
    useCallback(
      (e) => {
        const value = e.target.value;

        setSearch(value);

        navigate(
          `/search?q=${encodeURIComponent(
            value
          )}`
        );
      },
      [navigate]
    );

  const searchAnimation =
    useMemo(
      () => [
        "Search milk",
        1000,
        "Search bread",
        1000,
        "Search fruits",
        1000,
        "Search vegetables",
        1000,
        "Search paneer",
        1000,
        "Search curd",
        1000,
        "Search eggs",
        1000,
        "Search butter",
        1000,
        "Search cheese",
        1000,
        "Search rice",
        1000,
        "Search wheat flour",
        1000,
        "Search cooking oil",
        1000,
        "Search sugar",
        1000,
        "Search salt",
        1000,
        "Search chocolates",
        1000,
        "Search snacks",
        1000,
        "Search tea",
        1000,
        "Search coffee",
        1000,
        "Search soft drinks",
        1000,
        "Search ice cream",
        1000,
      ],
      []
    );

  return (
    <div
      className="
        flex
        h-11
        lg:h-12
        w-full
        min-w-[300px]
        lg:min-w-[420px]
        items-center
        gap-2
        rounded-lg
        border
        bg-white
        px-2
        text-neutral-500
        transition
        focus-within:border-[#ffbf00]
      "
    >
      <div>
        {isMobile && isSearchPage ? (
          <Link
            to="/"
            className="
              m-1
              flex
              h-full
              items-center
              justify-center
              rounded-full
              bg-white
              p-2
              shadow
              group-focus-within:text-[#ffbf00]
            "
          >
            <FaArrowLeft size={20} />
          </Link>
        ) : (
          <button
            type="button"
            className="
              flex
              h-full
              items-center
              justify-center
              px-2
              group-focus-within:text-[#ffbf00]
            "
          >
            <IoSearch size={20} />
          </button>
        )}
      </div>

      <div className="h-full w-full">
        {!isSearchPage ? (
          <div
            onClick={redirectToSearchPage}
            className="
              flex
              h-full
              cursor-text
              items-center
              overflow-hidden
            "
          >
            <TypeAnimation
              sequence={searchAnimation}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="
                whitespace-nowrap
                text-sm
                text-neutral-500
                md:text-base
              "
            />
          </div>
        ) : (
          <input
            type="text"
            autoFocus
            value={search}
            onChange={handleChange}
            placeholder="Search for atta, dal and more..."
            className="
              h-full
              w-full
              bg-transparent
              outline-none
            "
          />
        )}
      </div>
    </div>
  );
};

export default memo(Search);