import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";

/**
 * 路由保护组件 - 验证用户登录状态
 *
 * 功能特性：
 * - 检查用户认证状态
 * - 未登录用户重定向到登录页
 * - 保存原始访问路径，登录后跳转回来
 * - 自动检查token有效性
 */
const RequireAuth = ({ children }) => {
  const { isLogin } = useUserStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isLogin) {
      // 保存用户想要访问的页面，登录后跳转回来
      navigate("/login", { from: pathname });
    }
  }, []);

  return <>{children}</>;
};

export default RequireAuth;
