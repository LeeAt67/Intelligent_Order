import useTitle from "@/hooks/useTitle";
import styles from "./index.module.css";

const Favorites = () => {
  useTitle("收藏");
  return <div className={styles.favorites}>Favorites</div>;
};

export default Favorites;
