import "./App.css";
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import BlankLayout from "@/components/BlankLayout";
import Loading from "@/components/Loading";
import Toast from "@/components/Toast";

// 懒加载页面组件
const Home = lazy(() => import("@/pages/Home"));
const Menu = lazy(() => import("@/pages/Menu"));
const Orders = lazy(() => import("@/pages/Orders"));
const Profile = lazy(() => import("@/pages/Profile"));
const Detail = lazy(() => import("@/pages/Detail"));
const AI = lazy(() => import("@/pages/AI"));

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* 带有tabbar的主要页面 */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* 无tabbar的页面 */}
          <Route element={<BlankLayout />}>
            <Route path="/detail/:id" element={<Detail />} />
          </Route>
        </Routes>
      </Suspense>
      <Toast />
    </>
  );
}

export default App;
