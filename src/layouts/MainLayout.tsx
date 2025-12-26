import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Sidebar />

      <main className="ml-52 pt-[60px]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
