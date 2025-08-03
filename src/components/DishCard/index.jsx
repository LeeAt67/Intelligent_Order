import { Card, Button } from "react-vant";
import styles from "./index.module.css";

/**
 * 菜品卡片组件 - 展示单个菜品信息的卡片
 *
 * @param {Object} props - 组件属性
 * @param {Object} props.dish - 菜品数据对象
 * @param {string} props.dish.name - 菜品名称
 * @param {number} props.dish.price - 菜品价格
 * @param {string} props.dish.image - 菜品图片URL
 * @param {string} props.dish.desc - 菜品描述
 * @param {Function} props.onAddToCart - 添加到购物车的回调函数
 */
const DishCard = ({ dish, onAddToCart, onCardClick }) => {
  const { name, price, image, desc } = dish;

  // 处理添加到购物车
  const handleAddToCart = (e) => {
    e.stopPropagation(); // 阻止事件冒泡
    onAddToCart && onAddToCart(dish);
  };

  // 处理卡片点击
  const handleCardClick = () => {
    onCardClick && onCardClick(dish);
  };

  return (
    <Card className={styles.dishCard} onClick={handleCardClick}>
      <div className={styles.dishContent}>
        {/* 菜品图片 */}
        <div className={styles.imageContainer}>
          <img
            src={image}
            alt={name}
            className={styles.dishImage}
            loading="lazy" // 懒加载优化
          />
        </div>

        {/* 菜品信息 */}
        <div className={styles.dishInfo}>
          <h4 className={styles.dishName}>{name}</h4>

          <p className={styles.dishDesc}>{desc}</p>

          {/* 价格和添加按钮 */}
          <div className={styles.dishFooter}>
            <span className={styles.dishPrice}>¥{price}</span>
            <Button
              type="primary"
              size="small"
              onClick={handleAddToCart}
              className={styles.addButton}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DishCard;
