import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HomeO, Star, ChatO, ShoppingCartO, UserO } from "@react-vant/icons";
import "./TabBar.css";

const TabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      path: "/home",
      label: "首页",
      icon: <HomeO />,
    },
    {
      path: "/favorites",
      label: "收藏",
      icon: <Star />,
    },
    {
      path: "/ai",
      label: "AI助手",
      icon: <ChatO />,
    },
    {
      path: "/orders",
      label: "订单",
      icon: <ShoppingCartO />,
    },
    {
      path: "/profile",
      label: "我的",
      icon: <UserO />,
    },
  ];

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <div className="tab-bar">
      {tabs.map((tab) => (
        <div
          key={tab.path}
          className={`tab-item ${
            location.pathname === tab.path ? "active" : ""
          }`}
          onClick={() => handleTabClick(tab.path)}
        >
          <div className="tab-icon">{tab.icon}</div>
          <div className="tab-label">{tab.label}</div>
        </div>
      ))}
    </div>
  );
};

export default TabBar;
