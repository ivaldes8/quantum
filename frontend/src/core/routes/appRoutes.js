import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import routeNames from "./routeNames";
import ProtectedRoute from "./protectedRoute";

import Auth from "../../views/Auth/Auth";
import Register from "../../views/Auth/Register";
import Home from "../../views/Home/Home";
import Dashboard from "../../views/Dashboard/Dashboard"
import NotFound from "../../views/404/404";
import Group from "../../views/Group/Group"
import Investment from "../../views/Investment/Investment";
import InvestmentActions from "../../views/Investment/InvestmentActions";
import GroupInvestments from "../../views/Group/GroupInvestments";



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
        path={routeNames.group}
        exact
        element={
          <ProtectedRoute>
            <Group />
          </ProtectedRoute>
        }
      />
      <Route
        path={routeNames.groupInvestmens}
        exact
        element={
          <ProtectedRoute>
            <GroupInvestments />
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
            <InvestmentActions />
          </ProtectedRoute>
        }
      />
     <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default appRoutes;
