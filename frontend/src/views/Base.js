import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import { logout } from '../core/redux/features/auth/authSlice'

import MobileNav from "./Navbars/MobileNav";
import DesktopNav from "./Navbars/DesktopNav";

const Base = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  const currentUser = JSON.parse(localStorage.getItem("user"));
  // if(currentUser){
  //   console.log(decode(currentUser?.token).exp * 1000 > new Date().getTime(), 'TIME')
  // }
  if (currentUser && decode(currentUser?.token).exp * 1000 < new Date().getTime()) {
    dispatch(logout)
  }


  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return width <= 768 ? <MobileNav /> : <DesktopNav />;
};

export default Base;
