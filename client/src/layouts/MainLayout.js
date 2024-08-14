import React from "react";
import Header from "../components/Header";

function MainLayout({ children }) {
  return (
    <div>
      <Header />
      <main>
        {children}
      </main>
      {/* For Footer or other layout components */}
    </div>
  );
}

export default MainLayout;
