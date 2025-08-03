import styles from "./category.module.css";
import { Grid } from "react-vant";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  // 分类导航
  const [categories] = useState([
    { id: 1, name: "热菜", icon: "🍳" },
    { id: 2, name: "凉菜", icon: "🥗" },
    { id: 3, name: "汤品", icon: "🍲" },
    { id: 4, name: "主食", icon: "🍚" },
    { id: 5, name: "饮品", icon: "🥤" },
    { id: 6, name: "甜品", icon: "🍰" },
  ]);

  // 分类点击处理
  const handleCategoryClick = (category) => {
    navigate("/menu", { state: { category: category.name } });
  };
  return  (
  <div className={styles.categorySection}>
    <Grid columns={3} className={styles.categoryGrid}>
      {categories.map((category) => (
        <Grid.Item
          key={category.id}
          onClick={() => handleCategoryClick(category)}
        >
          <div className={styles.categoryItem}>
            <div className={styles.categoryIcon}>{category.icon}</div>
            <span className={styles.categoryName}>{category.name}</span>
          </div>
        </Grid.Item>
      ))}
    </Grid>
  </div>
  )
};

export default Category;