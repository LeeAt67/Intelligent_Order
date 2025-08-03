import useTitle from "@/hooks/useTitle";
import Banner from "@/components/Banner";
import Category from "@/components/Category";
import Nav from "@/components/Nav";
import Waterfall from "@/components/Waterfall";
import { useEffect } from "react";
import { useImageStore } from "@/store/useImageStore";

const Home = () => {
  // 网页标题
  useTitle("首页");

  const { loading, images, fetchMore } = useImageStore();

  useEffect(() => {
    fetchMore();
  }, []);

  return (
    <>
      {/* 顶部搜索栏 */}
      <Nav />
      {/* 轮播图 */}
      <Banner />
      {/* 分类导航 */}
      <Category />
      {/* 瀑布流图片展示区域 - 支持懒加载和无限滚动 */}
      <Waterfall images={images} fetchMore={fetchMore} loading={loading} />
    </>
  );
};

export default Home;
