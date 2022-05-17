import React from "react";
import { Route, Routes } from "react-router-dom";
import routeNames from "./routeNames";
import ProtectedRoute from "./protectedRoute";

import Auth from "../../views/Auth/Auth";
import Register from "../../views/Auth/Register";
import Home from "../../views/Home/Home";
import Investment from "../../views/Investment/Investment";
import InvestmentEdit from "../../views/Investment/InvestmenEdit";
import Action from "../../views/Action/Action";
import ActionEdit from "../../views/Action/ActionEdit";


const appRoutes = () => {
  return (
    <Routes>
      <Route path={routeNames.home} exact element={<Home />} />
      <Route path={routeNames.login} exact element={<Auth />} />
      <Route path={routeNames.register} exact element={<Register />} />
      <Route
        path={routeNames.dashboard}
        exact
        element={
          <ProtectedRoute>
            <Investment />
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
        path={routeNames.investmentEdit}
        exact
        element={
          <ProtectedRoute>
            <InvestmentEdit />
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
      <Route
        path={routeNames.actionEdit}
        exact
        element={
          <ProtectedRoute>
            <ActionEdit />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default appRoutes;
