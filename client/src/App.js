import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import routes from './routes/routes';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {routes}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
