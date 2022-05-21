import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import routeNames from "./routeNames";
import ProtectedRoute from "./protectedRoute";

import Auth from "../../views/Auth/Auth";
import Register from "../../views/Auth/Register";
import Home from "../../views/Home/Home";
import Investment from "../../views/Investment/Investment";
import Action from "../../views/Action/Action";
import { Dashboard } from "@mui/icons-material";


const appRoutes = () => {
  return (
    <Routes>
      <Route index exact element={<Home />} />
      <Route path={routeNames.home} exact element={<Home />} />
      <Route path={routeNames.login} exact element={<Auth />} />
      <Route path={routeNames.register} exact element={<Register />} />
      <Route
        path={routeNames.dashboard}
        exact
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path={routeNames.investment}
        exact
        element={
          <ProtectedRoute>
            <Investment />
          </ProtectedRoute>
        }
      />
      <Route
        path={routeNames.action}
        exact
        element={
          <ProtectedRoute>
            <Action />
          </ProtectedRoute>
        }
      />
     <Route path="*" element={<Investment />} />
    </Routes>
  );
};

export default appRoutes;
