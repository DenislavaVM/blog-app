import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import routes from "./routes/routes";
import { UserContextProvider } from "./context/UserContext";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <MainLayout>
          <Routes>
            {routes}
          </Routes>
        </MainLayout>
      </Router>
    </UserContextProvider>
  );
}

export default App;
