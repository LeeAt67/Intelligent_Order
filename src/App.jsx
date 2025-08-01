import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// 布局组件
import MainLayout from "@/components/MainLayout/MainLayout";
import BlankLayout from "@/components/BlankLayout/BlankLayout";

// 页面组件
import Home from "@/pages/Home";
import Favorites from "@/pages/Favorites";
import AI from "@/pages/AI";
import Orders from "@/pages/Orders";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";

import "./App.css";

function App() {
  return (
    <div>
      <Suspense>
        <Routes>
          {/* 主布局路由 */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="home" element={<Home />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="ai" element={<AI />} />
            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* 空白布局路由  */}
          <Route element={<BlankLayout />}>
            <Route path="login" element={<Login />} />
          </Route>

          {/* 默认重定向到首页 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
