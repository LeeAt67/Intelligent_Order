import { useState } from "react";
import { Image, Cell, Button, ActionSheet } from "react-vant";
import {
  SettingO,
  ServiceO,
  QuestionO,
  PendingPayment,
  LocationO,
  Scan,
} from "@react-vant/icons";
import useTitle from "@/hooks/useTitle";
import styles from "./index.module.css";
import { generateAvatar } from "@/llm";

const Profile = () => {
  useTitle("我的");

  const [userInfo, setUserInfo] = useState({
    username: "LeeAt",
    level: "5级",
    slogan: "我爱吃",
    avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
  });
  const [userData, setUserData] = useState({
    orderCount: 0,
    integral: 0,
    coupon: 0,
    collect: 0,
  });

  const [showActionSheet, setShowActionSheet] = useState(false);
  const actions = [
    {
      name: "AI生成头像",
      color: "#123123",
      type: 1,
    },
    {
      name: "上传头像",
      color: "#ee0a24",
      type: 2,
    },
  ];
  const handleAction = async (e) => {
    if (e.type === 1) {
      // AI 生成头像
    } else if (e.type === 2) {
      // 上传头像
    }
  };
  const handleMenuClick = (item) => {
    console.log("点击了菜单", item);
  };

  const handleLogout = () => {
    console.log("退出登录");
  };

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <Image
              round
              width="64px"
              height="64px"
              src={userInfo.avatar}
              style={{ cursor: "pointer" }}
              onClick={() => setShowActionSheet(true)}
            />
          </div>
          <div className="ml4">
            <div className={styles.username}>用户名：{userInfo.username}</div>
            <div className={styles.userLevel}>等级：{userInfo.level}</div>
            <div className={styles.slogan}>个性签名：{userInfo.slogan}</div>
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>{userData.orderCount}</div>
          <div className={styles.statLabel}>总订单</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>{userData.coupon}</div>
          <div className={styles.statLabel}>优惠券</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>{userData.collect}</div>
          <div className={styles.statLabel}>收藏</div>
        </div>
      </div>

      <div className={styles.menuSection}>
        <Cell.Group className={styles.menuGroup}>
          <Cell
            icon={<SettingO />}
            title="设置"
            isLink
            onClick={() => handleMenuClick("设置")}
          />
          <Cell
            icon={<ServiceO />}
            title="客服中心"
            isLink
            onClick={() => handleMenuClick("客服中心")}
          />
          <Cell
            icon={<QuestionO />}
            title="问题中心"
            isLink
            onClick={() => handleMenuClick("问题中心")}
          />
          <Cell
            icon={<PendingPayment />}
            title="钱包"
            isLink
            onClick={() => handleMenuClick("钱包")}
          />
          <Cell
            icon={<LocationO />}
            title="我的地址"
            isLink
            onClick={() => handleMenuClick("我的地址")}
          />
          <Cell
            icon={<Scan />}
            title="扫一扫"
            isLink
            onClick={() => handleMenuClick("扫一扫")}
          />
        </Cell.Group>
      </div>

      <ActionSheet
        visible={showActionSheet}
        actions={actions}
        cancelText="取消"
        onCancel={() => setShowActionSheet(false)}
        onSelect={(e) => handleAction(e)}
      ></ActionSheet>

      <div className={styles.logoutSection}>
        <Button
          type="danger"
          className={styles.logoutButton}
          onClick={handleLogout}
        >
          退出登录
        </Button>
      </div>
    </div>
  );
};

export default Profile;
