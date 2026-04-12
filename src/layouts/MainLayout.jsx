// src/layouts/MainLayout.jsx

import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const MainLayout = () => {
  return (
    <div>
      <Header />

      {/* Main content area - pages will render here */}
      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
