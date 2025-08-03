import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  items: [],

  // 添加商品到购物车
  addItem: (dish) => {
    const { items } = get();
    const existingItem = items.find((item) => item.id === dish.id);

    if (existingItem) {
      // 使用 immer 风格的更新，提升性能
      const newItems = items.map((item) =>
        item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      set({ items: newItems });
    } else {
      // 直接追加新项目
      set({ items: [...items, { ...dish, quantity: 1 }] });
    }
  },

  // 减少商品数量
  decreaseItem: (dishId) => {
    const { items } = get();
    set({
      items: items
        .map((item) =>
          item.id === dishId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    });
  },

  // 移除商品
  removeItem: (dishId) => {
    const { items } = get();
    set({
      items: items.filter((item) => item.id !== dishId),
    });
  },

  // 清空购物车
  clearCart: () => {
    set({ items: [] });
  },

  // 获取总数量
  getTotalQuantity: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.quantity, 0);
  },

  // 获取总价格
  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));
