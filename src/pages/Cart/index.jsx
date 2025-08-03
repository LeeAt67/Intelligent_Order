import { useNavigate } from "react-router-dom";
import { NavBar, Card, Button, Stepper, Empty } from "react-vant";
import { ArrowLeft } from "@react-vant/icons";
import useTitle from "@/hooks/useTitle";
import { useCartStore } from "@/store/useCartStore";
import { showToast } from "@/utils/eventBus";
import styles from "./index.module.css";

const Cart = () => {
  useTitle("购物车");
  const navigate = useNavigate();
  const {
    items,
    addItem,
    decreaseItem,
    removeItem,
    clearCart,
    getTotalPrice,
    getTotalQuantity,
  } = useCartStore();

  const totalPrice = getTotalPrice();
  const totalQuantity = getTotalQuantity();

  const handleBack = () => {
    navigate(-1);
  };

  const handleQuantityChange = (dish, value) => {
    if (value === 0) {
      removeItem(dish.id);
    } else if (value > dish.quantity) {
      addItem(dish);
    } else if (value < dish.quantity) {
      decreaseItem(dish.id);
    }
  };

  const handleRemoveItem = (dishId) => {
    removeItem(dishId);
    showToast("已移除商品");
  };

  const handleClearCart = () => {
    clearCart();
    showToast("购物车已清空");
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      showToast("购物车为空，请先添加商品");
      return;
    }
    // 这里可以跳转到订单确认页面
    showToast("跳转到结算页面");
  };

  return (
    <div className={styles.cart}>
      <NavBar
        title="购物车"
        leftArrow={<ArrowLeft />}
        onClickLeft={handleBack}
        className={styles.navbar}
      />

      <div className={styles.content}>
        {items.length === 0 ? (
          <div className={styles.emptyCart}>
            <Empty description="购物车是空的" />
            <Button
              type="primary"
              className={styles.goShoppingBtn}
              onClick={() => navigate("/menu")}
            >
              去点餐
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.cartHeader}>
              <span className={styles.itemCount}>
                共 {totalQuantity} 件商品
              </span>
              <Button
                type="danger"
                size="small"
                onClick={handleClearCart}
                className={styles.clearBtn}
              >
                清空购物车
              </Button>
            </div>

            <div className={styles.cartList}>
              {items.map((item) => (
                <Card key={item.id} className={styles.cartItem}>
                  <div className={styles.itemContent}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.itemImage}
                    />
                    <div className={styles.itemInfo}>
                      <h4 className={styles.itemName}>{item.name}</h4>
                      <p className={styles.itemDesc}>{item.desc}</p>
                      <div className={styles.itemActions}>
                        <span className={styles.itemPrice}>¥{item.price}</span>
                        <div className={styles.quantityControl}>
                          <Stepper
                            value={item.quantity}
                            min={0}
                            onChange={(value) =>
                              handleQuantityChange(item, value)
                            }
                            className={styles.stepper}
                          />
                          <Button
                            type="danger"
                            size="small"
                            onClick={() => handleRemoveItem(item.id)}
                            className={styles.removeBtn}
                          >
                            删除
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className={styles.cartFooter}>
              <div className={styles.totalInfo}>
                <span className={styles.totalLabel}>总计：</span>
                <span className={styles.totalPrice}>
                  ¥{totalPrice.toFixed(2)}
                </span>
              </div>
              <Button
                type="primary"
                size="large"
                onClick={handleCheckout}
                className={styles.checkoutBtn}
              >
                去结算
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
