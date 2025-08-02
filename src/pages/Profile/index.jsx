import { useState, useRef } from "react";
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
import { generateAvatarImage } from "@/llm";
import { showToast } from "@/utils/eventBus";

const Profile = () => {
  useTitle("我的");

  // 文件上传引用
  const fileInputRef = useRef(null);

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

  // 处理文件选择
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // 检查文件类型
      if (!file.type.startsWith("image/")) {
        showToast("请选择图片文件", "error");
        return;
      }

      // 检查文件大小 (限制为5MB)
      if (file.size > 5 * 1024 * 1024) {
        showToast("图片大小不能超过5MB", "error");
        return;
      }

      // 创建FileReader 预览图片
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setUserInfo({ ...userInfo, avatar: imageUrl });
      };
      reader.readAsDataURL(file);
    }

    // 重置input值，允许重复选择同一文件
    event.target.value = "";
  };

  const handleAction = async (e) => {
    setShowActionSheet(false); // 先关闭ActionSheet

    if (e.type === 1) {
      // AI 生成头像
      showToast("正在生成头像...", "warning", 0);
      try {
        const text = `
        请根据以下信息生成一个动漫头像：
        昵称: ${userInfo.username}，
        个性签名: ${userInfo.slogan}`;
        const result = await generateAvatarImage(text);

       //  console.log(result); 

        if (result.code === 0 && result.data?.imageUrl) {
          setUserInfo({ ...userInfo, avatar: result.data.imageUrl });
          showToast("头像生成成功", "success");
        } else {
          throw new Error(result.msg || "头像生成失败");
        }
      } catch (error) {
        showToast("头像生成失败", "error");
        console.error("AI头像生成失败:", error);
      }
    } else if (e.type === 2) {
      // 上传头像 - 触发文件选择
      fileInputRef.current?.click();
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

      {/* 隐藏的文件上传input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />

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
