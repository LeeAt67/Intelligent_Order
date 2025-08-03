import DishCard from "@/components/DishCard";
import { Empty } from "react-vant";
import styles from "./index.module.css";

/**
 * 菜品列表组件 - 展示某个分类下的菜品列表
 * DishList component - Display list of dishes in a category
 *
 * @param {Object} props - 组件属性
 * @param {Array} props.dishes - 菜品数据数组
 * @param {boolean} props.loading - 加载状态
 * @param {Function} props.onAddToCart - 添加到购物车的回调函数
 * @param {Function} props.onDishClick - 菜品点击的回调函数（可选）
 * @param {string} props.emptyText - 空状态提示文字
 * @param {string} props.className - 自定义样式类名
 */
const DishList = ({
  dishes = [],
  loading = false,
  onAddToCart,
  onDishClick,
  emptyText = "该分类暂无菜品",
  className,
}) => {
  // 加载状态
  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingText}>加载中...</div>
      </div>
    );
  }

  // 空状态
  if (!dishes || dishes.length === 0) {
    return (
      <div className={`${styles.container} ${className || ""}`}>
        <Empty description={emptyText} className={styles.emptyState} />
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className || ""}`}>
      <div className={styles.dishList}>
        {dishes.map((dish) => (
          <DishCard
            key={dish.id}
            dish={dish}
            onAddToCart={onAddToCart}
            onCardClick={onDishClick}
          />
        ))}
      </div>
    </div>
  );
};

export default DishList;
