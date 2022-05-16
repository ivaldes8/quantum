import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";

import MobileNav from './Navbars/MobileNav'
import DesktopNav from "./Navbars/DesktopNav";

const Base = () => {
  const navigate = useNavigate();

  const { user, isError, message } = useSelector((state) => state.auth);

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

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (message) {
      toast.info(message);
    }
    if (!user) {
      navigate("/login");
    }
  }, [user, isError, message, navigate]);

  return (
      width <= 768 ? <MobileNav/> : <DesktopNav/>
  );
};

export default Base;
