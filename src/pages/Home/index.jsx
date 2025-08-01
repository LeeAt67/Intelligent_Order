import useTitle from "@/hooks/useTitle";
import styles from "./index.module.css";

const Home = () => {
  useTitle("首页");
  return <div className={styles.home}>Home</div>;
};

export default Home;
