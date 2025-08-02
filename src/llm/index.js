/**
 * chat 聊天
 * @param {Array} messages 消息数组
 * @param {string} api_url 接口地址
 * @param {string} api_key 接口密钥
 * @param {string} model 模型
 * @returns {Promise<object>} 返回聊天响应
 */
const DEEPSEEK_CHAT_API_URL = "https://api.deepseek.com/chat/completions";
const KIM_CHAT_API_URL = "https://api.moonshot.cn/v1/chat/completions";
const DOUBAO_IMAGE_API_URL = "/api/doubao/images/generations";

// console.log(process.env.VITE_DEEPSEEK_API_KEY, '------');
export const chat = async (
  messages,
  api_url = DEEPSEEK_CHAT_API_URL,
  api_key = import.meta.env.VITE_DEEPSEEK_API_KEY,
  model = "deepseek-chat"
) => {
  try {
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${api_key}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
      }),
    });
    const data = await response.json();
    return {
      code: 0,
      data: {
        role: "assistant",
        content: data.choices[0].message.content,
      },
    };
  } catch (err) {
    return {
      code: 0,
      msg: "出错了...",
    };
  }
};

export const kimiChat = async (messages) => {
  const res = await chat(
    messages,
    KIM_CHAT_API_URL,
    import.meta.env.VITE_KIMI_API_KEY,
    "moonshot-v1-auto"
  );
  return res;
};

/**
 * 使用Doubao-Seedream-3.0-t2i模型生成头像图片
 * @param {string} prompt - 图像生成提示词
 * @returns {Promise<object>} 返回生成的图片URL
 */
export const generateAvatarImage = async (prompt) => {
  try {
    const response = await fetch(DOUBAO_IMAGE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // API密钥由代理服务器添加，前端不需要设置
      },
      body: JSON.stringify({
        model: "ep-20250802204822-xnpkq",
        prompt: prompt,
        size: "512x512", // 图片尺寸
        guidance_scale: 2.5, // 引导强度
        seed: Math.floor(Math.random() * 1000000), // 随机种子
        watermark: true, // 水印
      }),
    });

    const data = await response.json();

    if (data.data && data.data.length > 0) {
      return {
        code: 0,
        data: {
          imageUrl: data.data[0].url,
          prompt: prompt,
          model: "Doubao-Seedream-3.0-t2i",
        },
        msg: "头像图片生成成功",
      };
    } else {
      throw new Error("图片生成失败");
    }
  } catch (error) {
    console.error("Doubao图像生成失败:", error);
    return {
      code: -1,
      msg: "图片生成失败，请重试",
      data: null,
    };
  }
};
