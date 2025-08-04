/**
 * @fileoverview 用户登录相关 Mock API 接口
 * @description 提供用户登录和获取用户信息的模拟接口，用于开发环境测试
 * @author LeeAt67
 * @version 1.0.0
 */

import jwt from "jsonwebtoken";
import { showToast } from "../src/utils/eventBus";
const { sign } = jwt;

// JWT 密钥配置 (实际项目中应该使用环境变量进行配置)
const JWT_SECRET = "LeeAt67";

/**
 * 用户登录相关 Mock API 配置
 * @description 包含登录接口和用户信息获取接口的模拟实现
 * @exports {Array} Mock 接口配置数组
 */
export default [
  /**
   * 用户登录接口
   * @route POST /api/login
   * @description 验证用户凭据并返回 JWT token
   */
  {
    url: "/api/login",
    method: "post",
    timeout: 2000, // 模拟网络延迟 2 秒
    response: (req, res) => {
      // 从请求体中解构用户名和密码
      const { username, password } = req.body;

      // 验证用户凭据 (硬编码的测试账号)
      if (username !== "admin" || password !== "123456") {
        return {
          code: 1, // 错误状态码
          message: "用户名或密码错误",
        };
      }

      // 创建 JWT token，包含用户基本信息
      const token = sign(
        {
          user: {
            id: "001",
            username: "admin",
          },
        },
        JWT_SECRET, // 使用密钥签名
        { expiresIn: 86400 } // token 有效期 24 小时 (86400 秒)
      );

      // 返回成功登录响应
      return {
        token, // JWT token，客户端需要在后续请求中携带
        data: {
          id: "001",
          username: "admin",
        },
      };
    },
  },

  /**
   * 获取用户信息接口
   * @route GET /api/user
   * @description 根据 JWT token 解析并返回用户信息
   */
  {
    url: "/api/user",
    method: "get",
    response: (req, res) => {
      // 从请求头中提取 Authorization token
      // 格式: "Bearer <token>"，需要分割并取第二部分
      const token = req.headers["authorization"].split(" ")[1];
      // console.log(token);

      try {
        // 解码 JWT token 获取用户信息
        const decode = jwt.decode(token, JWT_SECRET);
        //console.log(decode);

        // 返回用户信息
        return {
          code: 0, // 成功状态码
          data: decode.user, // 解码后的用户数据
          message: "获取用户信息成功",
        };
      } catch (err) {
        // token 解码失败，返回错误信息
        showToast("Token 解码失败", "error");
        return {
          code: 1, // 错误状态码
          message: "Invalid token", // token 无效
        };
      }
    },
  },
];
