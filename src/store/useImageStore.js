import { create } from "zustand";
import { getImages } from "@/api/home";

/**
 * 图片数据状态管理 - 瀑布流组件的数据源
 * Image data state management - Data source for waterfall component
 *
 * 使用 Zustand 进行轻量级状态管理，支持：
 * - 图片数据存储和更新
 * - 分页加载控制
 * - 加载状态管理
 * - 无限滚动数据追加
 */
export const useImageStore = create((set, get) => ({
  // 图片数据数组，包含瀑布流展示的所有图片
  images: [],

  // 加载状态，防止重复请求
  loading: false,

  // 当前页码，用于分页加载
  page: 1,

  /**
   * 获取更多图片数据 - 无限滚动核心功能
   * Fetch more images - Core function for infinite scrolling
   *
   * 移动端优化特性：
   * - 防抖处理：避免重复请求
   * - 数据追加：保持已加载的图片
   * - 页码管理：自动递增页码
   */
  fetchMore: async () => {
    // 防抖处理：如果正在请求中，不再发起新的请求
    if (get().loading) return;

    // 设置加载状态，显示 Loading 提示
    set({ loading: true });

    try {
      // 调用 API 获取当前页的图片数据
      const res = await getImages(get().page);
      console.log(res);
      const newImages = res.data;

      // 更新状态：追加新图片、重置加载状态、递增页码
      set((state) => ({
        images: [...state.images, ...newImages], // 追加新数据，保持原有数据
        loading: false,
        page: state.page + 1, // 为下次加载准备页码
      }));
    } catch (error) {
      // 错误处理：重置加载状态
      console.error("获取图片数据失败:", error);
      set({ loading: false });
    }
  },
}));
