import "./App.css";
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import BlankLayout from "@/components/BlankLayout";
import RequireAuth from "@/components/RequireAuth";
import Loading from "@/components/Loading";
import Toast from "@/components/Toast";

// 懒加载页面组件
const Home = lazy(() => import("@/pages/Home"));
const Menu = lazy(() => import("@/pages/Menu"));
const Profile = lazy(() => import("@/pages/Profile"));
const AI = lazy(() => import("@/pages/AI"));
const Cart = lazy(() => import("@/pages/Cart"));
const Login = lazy(() => import("@/pages/Login"));

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* 带有tabbar的主要页面 - 需要登录认证 */}
          <Route
            element={
              <RequireAuth>
                <MainLayout />
              </RequireAuth>
            }
          >
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* 无tabbar的页面 - 公开访问 */}
          <Route element={<BlankLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* 404重定向 */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Suspense>
      <Toast />
    </>
  );
}

export default App;
