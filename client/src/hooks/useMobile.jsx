import {
  useCallback,
  useEffect,
  useState,
} from "react";

const useMobile = (
  breakpoint = 768
) => {
  const getIsMobile = () => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.innerWidth < breakpoint;
  };

  const [isMobile, setIsMobile] =
    useState(getIsMobile);

  const handleResize =
    useCallback(() => {
      setIsMobile(getIsMobile());
    }, [breakpoint]);

  useEffect(() => {
    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [handleResize]);

  return {
    isMobile,
  };
};

export default useMobile;