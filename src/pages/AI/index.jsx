import useTitle from "@/hooks/useTitle";
import styles from "./index.module.css";

const AI = () => {
  useTitle("AI助手");
  return <div className={styles.ai}>AI</div>;
};

export default AI;
