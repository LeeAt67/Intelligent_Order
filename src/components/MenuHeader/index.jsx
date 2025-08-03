import { NavBar } from "react-vant";
import styles from "./index.module.css";

/**
 * 菜单页面头部组件 - 移动端优化的页面标题栏
 *
 * @param {Object} props - 组件属性
 * @param {string} props.title - 标题文字，默认为"菜单"
 * @param {boolean} props.showBack - 是否显示返回按钮，默认false
 * @param {Function} props.onBack - 返回按钮点击回调
 */
const MenuHeader = ({ title = "菜单", showBack = false, onBack }) => {
  return (
    <div className={styles.container}>
      {showBack ? (
        <NavBar title={title} onClickLeft={onBack} className={styles.navbar} />
      ) : (
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </div>
      )}
    </div>
  );
};

export default MenuHeader;
