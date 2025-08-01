import { useState, useEffect } from "react";
import { Tabbar } from "react-vant";
import { HomeO, AppsO, ChatO, BillO, UserO } from "@react-vant/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

// 菜单栏配置
const tabs = [
  { icon: <HomeO />, title: "首页", path: "/home" },
  { icon: <AppsO />, title: "菜单", path: "/menu" },
  { icon: <ChatO />, title: "AI饮食助手", path: "/ai" },
  { icon: <BillO />, title: "订单", path: "/orders" },
  { icon: <UserO />, title: "我的", path: "/profile" },
];

const MainLayout = () => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // console.log(location.pathname, "////");

    // es6中的findIndex,startsWith方法
    const index = tabs.findIndex((tab) =>
      location.pathname.startsWith(tab.path)
    );
    setActive(index);
  }, []);
  return (
    <div className="flex flex-col h-screen" style={{ paddingBottom: "50px" }}>
      <div className="flex-1">
        {" "}
        <Outlet />
      </div>
      {/* tabbar */}
      <Tabbar
        value={active}
        onChange={(key) => {
          setActive(key);
          navigate(tabs[key].path);
        }}
      >
        {tabs.map((tab, index) => (
          <Tabbar.Item key={index} icon={tab.icon}>
            {tab.title}
          </Tabbar.Item>
        ))}
      </Tabbar>
    </div>
  );
};

export default MainLayout;
