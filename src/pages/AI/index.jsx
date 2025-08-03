import { useState, useRef, useEffect } from "react";
import { Field, Button } from "react-vant";
import useTitle from "@/hooks/useTitle";
import { chat } from "@/llm";
import { eventBus } from "@/utils/eventBus";
import styles from "./index.module.css";

const AI = () => {
  useTitle("智能助手");
  const messagesEndRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content:
        "我是您的智能点餐助手小食，很高兴为您服务！\n\n我可以帮您：\n• 推荐适合的菜品\n• 解答菜品相关问题\n• 协助完成点餐\n\n请告诉我您的需求吧～",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // 调用AI接口
      const response = await chat(inputValue);
      // console.log(response);

      if (response.code === 0 && response.data) {
        const aiResponse = {
          id: Date.now() + 1,
          type: "ai",
          content: response.data.content,
        };
        setMessages((prev) => [...prev, aiResponse]);
      } else {
        throw new Error(response.msg || "AI回复失败");
      }
    } catch (error) {
      console.error("AI回复出错:", error);

      // 显示错误Toast
      eventBus.emit("toast", {
        message: "AI助手目前无法回复，请稍后重试",
        type: "error",
        duration: 3000,
      });

      // 添加错误提示消息
      const errorResponse = {
        id: Date.now() + 1,
        type: "ai",
        content:
          "抱歉，我暂时无法回复您的消息，请稍后重试。如有紧急需要，您可以直接浏览菜单进行点餐。",
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className={styles.ai}>
      <div className={styles.header}>
        <h2 className={styles.title}>智能饮食助手</h2>
      </div>

      <div className={styles.messagesContainer}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${styles[message.type]}`}
          >
            <div className={styles.messageContent}>{message.content}</div>
          </div>
        ))}

        {isLoading && (
          <div className={`${styles.message} ${styles.ai}`}>
            <div className={styles.messageContent}>
              <div className={styles.typing}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputContainer}>
        <Field
          value={inputValue}
          onChange={setInputValue}
          placeholder="请输入您的需求..."
          className={styles.input}
          onKeyPress={handleKeyPress}
        />
        <Button
          type="primary"
          className={styles.sendButton}
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isLoading}
        >
          ➤
        </Button>
      </div>
    </div>
  );
};

export default AI;
