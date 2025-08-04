import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";
import useTitle from "@/hooks/useTitle";
import { Field, Button } from "react-vant";
import { showToast } from "@/utils/eventBus";

const Login = () => {
  useTitle("登录");

  const { login } = useUserStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    const { username, password } = formData;
    // console.log("登录数据:", { username, password });

    // 验证数据不为空
    if (!username || !password) {
      showToast("请输入用户名和密码", "error");
      return;
    }

    // 验证最小长度
    if (username.length < 3) {
      showToast("用户名至少3个字符", "error");
      return;
    }

    if (password.length < 6) {
      showToast("密码至少6个字符", "error");
      return;
    }

    setIsLoading(true);

    try {
      await login({ username, password });
      showToast("登录成功", "success");
      // 登录成功，跳转到首页
      navigate("/");
    } catch (err) {
      // 登录失败，显示错误信息
      const errorMessage = "登录失败，请检查用户名和密码";
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      // es6 计算属性名
      [field]: value,
    }));
  };

  return (
    <div>
      <div>
        <div>
          <p style={{ fontSize: "16px", fontWeight: "bold" }}>
            请输入您的账号信息
          </p>
        </div>

        <div>
          <Field
            label="用户名"
            placeholder="请输入用户名"
            value={formData.username}
            onChange={(value) => handleInputChange("username", value)}
            disabled={isLoading}
          />

          <Field
            type="password"
            label="密码"
            placeholder="请输入密码"
            value={formData.password}
            onChange={(value) => handleInputChange("password", value)}
            disabled={isLoading}
          />

          <div style={{ marginTop: "20px" }}>
            <Button
              type="primary"
              loading={isLoading}
              block
              size="large"
              onClick={handleLogin}
            >
              {isLoading ? "登录中..." : "登录"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
