import { Outlet } from "react-router-dom";
import styles from "./index.module.css";

const BlankLayout = () => {
  return (
    <div className={styles.layout}>
      <Outlet />
    </div>
  );
};

export default BlankLayout;
