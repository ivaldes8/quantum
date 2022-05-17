import { useEffect, useState } from "react";

import MobileNav from "./Navbars/MobileNav";
import DesktopNav from "./Navbars/DesktopNav";

const Base = () => {

  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return width <= 768 ? <MobileNav /> : <DesktopNav />;
};

export default Base;
