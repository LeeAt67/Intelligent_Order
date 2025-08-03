import axios from "./config";

/**
 * 获取首页banner数据
 * @returns {Promise} banner列表
 */
export const getBanners = () => {
  return axios.get("/banners");
};
