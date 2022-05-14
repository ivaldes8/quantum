import React from 'react';
import { BrowserRouter } from "react-router-dom";

import AppRoutes from './routes/appRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  );
}

export default App;
