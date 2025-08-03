import useTitle from "@/hooks/useTitle";
import Banner from "@/components/Banner";
import Category from "@/components/Category";
import Nav from "@/components/Nav";
import Waterfall from "@/components/Waterfall";

const Home = () => {
  // 网页标题
  useTitle("首页");

  return (
    <>
      {/* 顶部搜索栏 */}
      <Nav />
      {/* 轮播图 */}
      <Banner />
      {/* 分类导航 */}
      <Category />
      {/*瀑布流*/}
      <Waterfall />
    </>
  );
};

export default Home;
