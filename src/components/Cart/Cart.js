import logo from "../../assets/images/logo.png";
import title from "../../assets/images/title.png";
import trash from "../../assets/images/trash.svg";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import useRequireAuth from "../hooks/useRequireAuth";
import "./Cart.css";

function Cart() {
  const {
    cartItems,
    coupon,
    removeFromCart,
    updateCartItem,
    getCartTotal,
    applyCoupon,
    removeCoupon,
    getTax,
    getDiscount,
    getFinalTotal
  } = useContext(CartContext);

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setCouponError("");
    setCouponLoading(true);
    const result = await applyCoupon(couponCode.trim());
    if (result.status === "error") {
      setCouponError(result.message);
    } else {
      setCouponCode("");
    }
    setCouponLoading(false);
  };

  const { isLoggedIn } = useContext(AuthContext);

  useRequireAuth(isLoggedIn);


  return (
    <div className="cart">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="" />
          <img src={title} alt="" />
        </Link>
      </div>

      <hr />

      <h3>السلة</h3>

      {cartItems.length > 0 ? (
        <div className="cart-container">

          {/* LEFT */}
          <div className="cart-item-details">
            {cartItems.map((item) => (
              <div className="box" key={item.id}>

                {/* INFO */}
                <div className="cart-item-info">
                  <img src={item.product.image} alt="" />

                  <div>
                    <h3>{item.product.name}</h3>
                    <div id="descrption">لوحة</div>
                  </div>
                </div>

                {/* QUANTITY */}
                {/* <div className="cart-item-quantity">

                  <button
                    onClick={() =>
                      updateCartItem(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>

                  {item.quantity}

                  <button
                    onClick={() =>
                      updateCartItem(item.id, item.quantity + 1)
                    }
                    disabled={item.quantity >= item.product.stock}
                  >
                    +
                  </button>

                </div> */}

                {/* PRICE */}
                <div className="cart-item-price">
                  <h3>{item.product.price} ر.س</h3>

                  <div className="icons">
                    <img
                      src={trash}
                      alt=""
                      onClick={() => removeFromCart(item.id)}
                    />
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="cart-price-details">
            <div className="summary-header">
              <h3>ملخص الطلب</h3>
              <p>مراجعة سريعة للعناصر قبل إتمام الدفع</p>
            </div>

            <div className="summary-items">
              {cartItems.map((item) => (
                <div className="row summary-item" key={item.id}>
                  <div className="summary-item-info">
                    <h4>{item.product.name}</h4>
                    <span>الكمية: {item.quantity}</span>
                  </div>

                  <h4>{Number(item.product.price) * item.quantity} ر.س</h4>
                </div>
              ))}
            </div>

            <div className="row summary-row">
              <h4>رسوم التوصيل</h4>
              <span className="delivery-badge">مجانا</span>
            </div>

            <div className="row summary-row">
              <h4>المجموع الجزئي</h4>
              <span>{getCartTotal().toFixed(2)} ر.س</span>
            </div>

            <div className="row summary-row">
              <h4>الضريبة (15%)</h4>
              <span>{getTax().toFixed(2)} ر.س</span>
            </div>

            {coupon && (
              <div className="row summary-row coupon-applied-row">
                <h4>الخصم ({coupon.code})</h4>
                <span className="discount-amount">- {getDiscount().toFixed(2)} ر.س</span>
              </div>
            )}

            <hr />

            {coupon ? (
              <div className="coupon-applied">
                <span>تم تطبيق الكوبون: {coupon.code}</span>
                <button type="button" className="remove-coupon-btn" onClick={removeCoupon}>إزالة</button>
              </div>
            ) : (
              <form className="coupon-form" onSubmit={handleApplyCoupon}>
                <input
                  type="text"
                  placeholder="كوبون الخصم"
                  value={couponCode}
                  onChange={(e) => { setCouponCode(e.target.value); setCouponError(""); }}
                />
                <input type="submit" value={couponLoading ? "..." : "تطبيق"} disabled={couponLoading} />
              </form>
            )}

            {couponError && <p className="coupon-error">{couponError}</p>}

            <div className="row total-row">
              <div>
                <h3>الإجمالي</h3>
                <p>شامل الضريبة والخصومات</p>
              </div>
              <h3>{getFinalTotal().toFixed(2)} ر.س</h3>
            </div>

            <Link to={'/payment'}>
              <button className="btn">الدفع</button>
            </Link>

          </div>

        </div>
      ) : (
        <div className="empty-cart">
          <h3>السلة فارغة</h3>
        </div>
      )}
    </div>
  );
}

export default Cart;
