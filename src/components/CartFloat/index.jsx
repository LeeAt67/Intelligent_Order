import React, { memo } from "react";
import { Badge } from "react-vant";
import { ShoppingCartO } from "@react-vant/icons";
import styles from "./index.module.css";

/**
 * 浮动购物车按钮组件 - 固定在右下角的购物车快捷入口
 *
 * @param {Object} props - 组件属性
 * @param {number} props.count - 购物车商品数量
 * @param {Function} props.onClick - 点击购物车的回调函数
 * @param {boolean} props.visible - 是否显示购物车按钮
 * @param {string} props.className - 自定义样式类名
 */
const CartFloat = memo(({ count = 0, onClick, visible = true, className }) => {
  // 不显示时返回null
  if (!visible) {
    return null;
  }

  // 处理点击事件
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <div
      className={`${styles.cartFloat} ${className || ""}`}
      onClick={handleClick}
    >
      {count > 0 ? (
        <Badge content={count} className={styles.cartBadge} max={99}>
          <div className={styles.cartButton}>
            <ShoppingCartO className={styles.cartIcon} />
          </div>
        </Badge>
      ) : (
        <div className={styles.cartButton}>
          <ShoppingCartO className={styles.cartIcon} />
        </div>
      )}
    </div>
  );
});

CartFloat.displayName = "CartFloat";

export default CartFloat;
