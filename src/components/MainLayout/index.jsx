import { useState, useEffect } from "react";
import { Tabbar } from "react-vant";
import { HomeO, AppsO,BillO, UserO } from "@react-vant/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./index.module.css";

// 菜单栏配置
const tabs = [
  { icon: <HomeO />, title: "首页", path: "/home" },
  { icon: <AppsO />, title: "菜单", path: "/menu" },
  {
    icon: (
      <svg
        t="1754208353786"
        className="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="7876"
        width="42"
        height="42"
      >
        <path
          d="M543.424 104.896l304 171.84a64 64 0 0 1 32.512 55.712v359.584a64 64 0 0 1-32.512 55.712l-304 171.84a64 64 0 0 1-62.88 0.096L175.04 747.744a64 64 0 0 1-32.64-55.776V332.544a64 64 0 0 1 32.64-55.776l305.472-171.936a64 64 0 0 1 62.88 0.064z"
          fill="#FFFFFF"
          p-id="7877"
        ></path>
        <path
          d="M174.432 560v131.968a32 32 0 0 0 13.12 25.792l3.2 2.08 305.472 171.936a32 32 0 0 0 27.712 1.792l3.744-1.824 304-171.84a32 32 0 0 0 16-24.064l0.256-3.808V656a16 16 0 0 1 32 0v36.032a64 64 0 0 1-32.512 55.712l-304 171.84a64 64 0 0 1-62.88 0.096L175.04 747.744a64 64 0 0 1-32.64-55.776V560h32zM543.424 104.896l304 171.84a64 64 0 0 1 32.512 55.712l-0.032 130.208h-32v-130.208a32 32 0 0 0-13.024-25.76l-3.2-2.08-304-171.84a32 32 0 0 0-27.68-1.856l-3.776 1.792-305.472 171.968a32 32 0 0 0-16.064 24.064l-0.224 3.808V368a16 16 0 0 1-32 0v-35.456A64 64 0 0 1 175.04 276.768l305.472-171.936a64 64 0 0 1 62.88 0.064z"
          fill="#5D6D7E"
          p-id="7878"
        ></path>
        <path
          d="M160 448a64 64 0 1 1 0 128 64 64 0 0 1 0-128z m704 0a64 64 0 1 1 0 128 64 64 0 0 1 0-128zM160 480a32 32 0 1 0 0 64 32 32 0 0 0 0-64z m704 0a32 32 0 1 0 0 64 32 32 0 0 0 0-64z"
          fill="#5D6D7E"
          p-id="7879"
        ></path>
        <path
          d="M344.768 672l35.2-97.12h134.08L551.52 672h48.32l-131.2-320.672h-45.76L299.712 672h45.056z m156.16-131.68h-108.704l35.2-94.08c7.456-20.256 13.216-40.672 17.28-61.248 4.992 17.376 12.576 39.52 22.784 66.496l33.472 88.832zM683.424 672V351.328H640.96V672h42.432z"
          fill="#27A2DF"
          p-id="7880"
        ></path>
      </svg>
    ),
    title: "",
    path: "/ai",
  },
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
    <div className={styles.layout}>
      <div className={styles.content}>
        <Outlet />
      </div>
      {/* tabbar */}
      <Tabbar
        value={active}
        onChange={(key) => {
          setActive(key);
          navigate(tabs[key].path);
        }}
        className={styles.tabbar}
        fixed
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
