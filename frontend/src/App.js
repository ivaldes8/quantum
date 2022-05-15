import React from "react";
import { BrowserRouter } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import AppRoutes from "./core/routes/appRoutes";
import Base from "./views/Base";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Base/>
        <AppRoutes />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
