import useTitle from "@/hooks/useTitle";
import styles from "./index.module.css";
const Shop = () => {
  useTitle("商城");
  return <div className={styles.shop}>Shop</div>;
};

export default Shop;
