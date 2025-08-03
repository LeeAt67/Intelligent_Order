import styles from "./card.module.css";
import { useRef, useEffect } from "react";

/**
 * 图片卡片组件 - 支持懒加载的瀑布流项目
 * ImageCard component - Waterfall item with lazy loading support
 *
 * @param {Object} props - 组件属性
 * @param {string} props.url - 图片 URL
 * @param {number} props.height - 图片高度（px），用于瀑布流布局
 */
const ImageCard = (props) => {
  const { url, height } = props;
  // 图片元素引用，用于懒加载观察
  const imgRef = useRef(null);

  // 实现图片懒加载功能
  // 移动端性能优化：只有图片进入视口才开始加载
  useEffect(() => {
    // 创建交叉观察者，监听图片是否进入视口
    const observer = new IntersectionObserver(([entry], obs) => {
      if (entry.isIntersecting) {
        const img = entry.target;

        // 创建新的图片对象预加载
        const oImg = document.createElement("img");
        oImg.src = img.dataset.src;

        // 图片加载完成后显示
        oImg.onload = function () {
          img.src = img.dataset.src;
        };

        // 停止观察已加载的图片，释放资源
        obs.unobserve(img);
      }
    });

    // 开始观察图片元素
    if (imgRef.current) observer.observe(imgRef.current);
  }, []);

  return (
    <>
      <div style={{ height }} className={styles.card}>
        {/* 
          使用 data-src 存储真实图片地址，src 初始为空
          移动端优化：减少初始加载时间和流量消耗
        */}
        <img ref={imgRef} data-src={url} className={styles.img} />
      </div>
    </>
  );
};
export default ImageCard;
