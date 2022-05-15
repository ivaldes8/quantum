import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routeNames from './routeNames'

import Auth from '../../views/Auth/Auth';
import Home from '../../views/Home/Home';
import Investment from '../../views/Investment/Investment';
import InvestmentEdit from '../../views/Investment/InvestmenEdit';
import Action from '../../views/Action/Action';
import ActionEdit from '../../views/Action/ActionEdit';

const appRoutes = () => {
  return <Routes>
      <Route path={routeNames.home} exact element={<Home/>}/>
      <Route path={routeNames.login} exact element={<Auth/>}/>
      <Route path={routeNames.investment} exact element={<Investment/>}/>
      <Route path={routeNames.investmentEdit} exact element={<InvestmentEdit/>}/>
      <Route path={routeNames.action} exact element={<Action/>}/>
      <Route path={routeNames.actionEdit} exact element={<ActionEdit/>}/>
  </Routes>
}

export default appRoutes