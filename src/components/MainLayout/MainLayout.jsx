import React from "react";
import { Outlet } from "react-router-dom";
import TabBar from "../Tabbars/TabBar";
import "./MainLayout.css";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <div className="main-content">
        <Outlet />
      </div>
      <TabBar />
    </div>
  );
};

export default MainLayout;
