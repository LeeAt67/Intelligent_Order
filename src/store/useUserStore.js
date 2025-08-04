import { create } from "zustand";
import { doLogin } from "@/api/user";

/**
 * 用户状态管理 - Zustand
 *
 * 功能特性：
 * - isLogin 登录状态管理
 * - user 用户信息管理
 * - token 管理
 * - 登录登出操作
 */

export const useUserStore = create((set) => ({
  // 状态
  isLogin: !!localStorage.getItem("token"), // 从localStorage恢复登录状态
  user: null, // 用户信息

  // 登录操作
  login: async ({ username = "", password = "" }) => {
    const res = await doLogin({ username, password });
    // console.log(res);
    const { token, data: user } = res;
    // console.log(token, user);
    // 添加本地存储
    localStorage.setItem("token", token);
    set({
      isLogin: true,
      user,
    });
  },

  // 登出操作
  logout: () => {
    // 清除本地存储
    localStorage.removeItem("token");
    set({
      isLogin: false,
      user: null,
    });
  },
}));
