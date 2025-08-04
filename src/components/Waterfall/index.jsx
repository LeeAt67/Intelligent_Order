import { useEffect, useRef } from "react";
import { Skeleton } from "react-vant";
import ImageCard from "@/components/ImageCard";
import styles from "./waterfall.module.css";

/**
 * 瀑布流组件 - 移动端优化的双列图片展示
 * Waterfall component - Mobile-optimized dual-column image display
 *
 * @param {Object} props - 组件属性
 * @param {Array} props.images - 图片数据数组
 * @param {Function} props.fetchMore - 加载更多数据的回调函数
 * @param {boolean} props.loading - 加载状态
 */
const Waterfall = (props) => {
  const { images, fetchMore, loading } = props;
  // 加载器引用，用于触发无限滚动
  const loader = useRef(null);

  // 使用 IntersectionObserver 实现无限滚动
  // 移动端性能优化：避免监听 scroll 事件
  useEffect(() => {
    // 创建交叉观察者，监听加载器是否进入视口
    const observer = new IntersectionObserver(([entry], obs) => {
      if (entry.isIntersecting) {
        // 当加载器进入视口时，触发加载更多数据
        fetchMore();
      }
    });

    // 开始观察加载器元素
    if (loader.current) observer.observe(loader.current);

    // 清理函数：组件卸载时断开观察者
    return () => observer.disconnect();
  }, [images]);

  return (
    <div>
      <div className={styles.wrapper}>
        {/* 左列：显示偶数索引的图片 (0, 2, 4, ...) */}
        <div className={styles.column}>
          {images
            .filter((_, i) => !(i & 1)) // 使用按位与运算过滤偶数索引
            .map((img) => (
              <ImageCard key={img.id} {...img} />
            ))}
        </div>

        {/* 右列：显示奇数索引的图片 (1, 3, 5, ...) */}
        <div className={styles.column}>
          {images
            .filter((_, i) => i & 1) // 使用按位与运算过滤奇数索引
            .map((img) => (
              <ImageCard key={img.id} {...img} />
            ))}
        </div>

        {/* 加载器：触发无限滚动的检测元素 */}
        <div ref={loader} className={styles.loader}>
          {loading && <Skeleton rowHeight={20} />}
        </div>
      </div>
    </div>
  );
};

export default Waterfall;
