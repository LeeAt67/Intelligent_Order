import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Tabs } from "react-vant";
import useTitle from "@/hooks/useTitle";
import MenuHeader from "@/components/MenuHeader";
import DishList from "@/components/DishList";
import CartFloat from "@/components/CartFloat";
import { useCartStore } from "@/store/useCartStore";
import { showToast } from "@/utils/eventBus";
import { getCategories, getDishesByCategory } from "@/api/menu";
import styles from "./index.module.css";

/**
 * 菜单页面
 *
 * 功能特性：
 * - 分类导航：支持按菜品分类浏览
 * - 数据驱动：使用 MockJS 模拟真实数据
 * - 组件化设计：拆分为多个可复用组件
 * - 购物车集成：支持添加商品到购物车
 * - 移动端优化：响应式设计和触摸交互
 */
const Menu = () => {
  // 页面标题设置
  useTitle("菜单");

  // 路由和导航
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // 购物车状态管理 直接订阅计算值提升响应速度
  const addItem = useCartStore((state) => state.addItem);
  const cartQuantity = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  // 页面状态
  const [activeTab, setActiveTab] = useState("1");
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState({});
  const [loading, setLoading] = useState(false);

  // 加载菜品分类数据
  const loadCategories = async () => {
    try {
      const response = await getCategories();
      if (response.code === 0) {
        setCategories(response.data);
        // 如果有分类数据，默认选择第一个分类
        if (response.data.length > 0 && !searchParams.get("category")) {
          setActiveTab(response.data[0].id);
        }
      }
    } catch (error) {
      console.error("加载分类数据失败:", error);
      showToast("加载分类数据失败");
    }
  };

  // 加载指定分类的菜品数据
  const loadDishes = async (categoryId) => {
    // 如果该分类的数据已加载，直接返回
    if (dishes[categoryId]) {
      return;
    }

    setLoading(true);
    try {
      const response = await getDishesByCategory(categoryId);
      if (response.code === 0) {
        setDishes((prev) => ({
          ...prev,
          [categoryId]: response.data,
        }));
      }
    } catch (error) {
      console.error("加载菜品数据失败:", error);
      showToast("加载菜品数据失败");
    } finally {
      setLoading(false);
    }
  };

  // 初始化数据加载
  useEffect(() => {
    loadCategories();
  }, []);

  // 处理 URL 参数中的分类切换
  useEffect(() => {
    const categoryId = searchParams.get("category");
    if (categoryId && categories.find((cat) => cat.id === categoryId)) {
      setActiveTab(categoryId);
    }
  }, [searchParams, categories]);

  // 当选中的标签页改变时，加载对应的菜品数据
  useEffect(() => {
    if (activeTab) {
      loadDishes(activeTab);
    }
  }, [activeTab]);

  // 处理添加到购物车 - 使用 useCallback 优化性能
  const handleAddToCart = React.useCallback(
    (dish) => {
      addItem(dish);
      showToast("已添加到购物车");
    },
    [addItem]
  );

  // 处理菜品卡片点击
  const handleDishClick = (dish) => {
    console.log("点击菜品:", dish);
    // navigate(`/dish/${dish.id}`);
  };

  // 处理购物车按钮点击
  const handleGoToCart = () => {
    navigate("/cart");
  };

  // 处理分类标签切换
  const handleTabChange = (categoryId) => {
    setActiveTab(categoryId);
  };

  return (
    <div className={styles.menu}>
      {/* 页面头部 */}
      <MenuHeader title="菜单" />

      {/* 分类导航和菜品列表 */}
      <Tabs
        active={activeTab}
        onChange={handleTabChange}
        className={styles.tabs}
      >
        {categories.map((category) => (
          <Tabs.TabPane
            key={category.id}
            title={category.name}
            name={category.id}
          >
            {/* 菜品列表组件 */}
            <DishList
              dishes={dishes[category.id] || []}
              loading={loading}
              onAddToCart={handleAddToCart}
              onDishClick={handleDishClick}
              emptyText={`${category.name}分类暂无菜品`}
            />
          </Tabs.TabPane>
        ))}
      </Tabs>

      {/* 浮动购物车按钮 - 仅在有商品时显示 */}
      <CartFloat
        count={cartQuantity}
        onClick={handleGoToCart}
        visible={cartQuantity > 0}
      />
    </div>
  );
};

export default Menu;
