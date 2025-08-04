import styles from "./banner.module.css";
import React from "react";
import { Swiper, Skeleton } from "react-vant";
import { useState, useRef, useEffect } from "react";
import { getBanners } from "@/api/home";

const Banner = () => {
  const [bannersLoading, setBannersLoading] = useState(true);
  const bannerRef = useRef([]);

  useEffect(() => {
    const fetchBanners = async () => {
      setBannersLoading(true);
      try {
        const response = await getBanners();
        if (response.code === 0 && response.data.image) {
          bannerRef.current = response.data.image;
        }
      } catch (error) {
        console.error("获取banner数据失败:", error);
      }
      setBannersLoading(false);
    };
    fetchBanners();
  }, []);

  return (
    <div className={styles.banner}>
      {bannersLoading ? (
        <Skeleton title />
      ) : bannerRef.current && bannerRef.current.length > 0 ? (
        <Swiper autoplay={3000} className={styles.swiper}>
          {bannerRef.current.map((banner, index) => (
            <Swiper.Item key={banner.alt || index}>
              <img
                src={banner.url}
                alt={banner.alt}
                className={styles.bannerImage}
              />
            </Swiper.Item>
          ))}
        </Swiper>
      ) : (
        <div className={styles.bannerPlaceholder}>暂无轮播图</div>
      )}
    </div>
  );
};

export default Banner;
