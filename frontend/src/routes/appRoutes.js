import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routeNames from './routeNames'
import { useTranslation } from "react-i18next";

const appRoutes = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = useTranslation()
  return <Routes>
      <Route path={routeNames.home} exact element={<p>{t("hello_welcome_to_react")}</p>}/>
      <Route path={routeNames.login} exact element={<h1>LOGIN</h1>}/>
      <Route path={routeNames.investment} exact element={<h1>INVESTMENT</h1>}/>
      <Route path={routeNames.investmentEdit} exact element={<h1>INVESTMENTEDIT</h1>}/>
      <Route path={routeNames.action} exact element={<h1>ACTION</h1>}/>
      <Route path={routeNames.actionEdit} exact element={<h1>ACTIONEDIT</h1>}/>
  </Routes>
}

export default appRoutes