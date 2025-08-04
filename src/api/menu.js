import axios from "./config";

/**
 * 菜单相关 API - 餐厅菜品数据接口
 * Menu related APIs - Restaurant dish data interfaces
 */

/**
 * 获取菜品分类列表
 * Get menu categories list
 *
 * @returns {Promise} 分类数据
 */
export const getCategories = () => {
  return axios.get("/menu/categories");
};

/**
 * 获取菜品列表
 * Get dishes list
 *
 * @param {string} categoryId - 分类ID，可选
 * @returns {Promise} 菜品数据
 */
export const getDishes = (categoryId) => {
  const params = categoryId ? { categoryId } : {};
  return axios.get("/menu/dishes", { params });
};

/**
 * 根据分类ID获取菜品
 * Get dishes by category ID
 *
 * @param {string} categoryId - 分类ID
 * @returns {Promise} 该分类下的菜品列表
 */
export const getDishesByCategory = (categoryId) => {
  return getDishes(categoryId);
};
