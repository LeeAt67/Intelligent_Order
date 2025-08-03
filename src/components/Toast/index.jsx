import { useState, useEffect } from "react";
import { eventBus } from "@/utils/eventBus";
import styles from "./index.module.css";

const Toast = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success"); // success, error, warning

  useEffect(() => {
    const showToast = ({ message, type = "success", duration = 2000 }) => {
      setMessage(message);
      setType(type);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, duration);
    };

    eventBus.on("toast", showToast);

    return () => {
      eventBus.off("toast", showToast);
    };
  }, []);

  if (!visible) return null;

  return <div className={`${styles.toast} ${styles[type]}`}>{message}</div>;
};

export default Toast;
