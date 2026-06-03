import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-new.png";
import "./PaymentSuccess.css";

import { useEffect, useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { useLoading } from "../contexts/LoadingContext";


function PaymentSuccess() {
  const { fetchCart } = useContext(CartContext);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    const syncData = async () => {
      setIsLoading(true);

      try {
        // Wait briefly for the webhook to finish
        await new Promise((res) => setTimeout(res, 1500));
        await fetchCart();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    syncData();
  }, []);


  return (
    <div className="payment-success">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="مسحة" className="site-logo" />
        </Link>
      </div>

      <div className="payment-success-card">
        <div className="success-badge">تم الدفع بنجاح</div>
        <h1>شكرًا لك</h1>
        <p>
          تم استلام عملية الدفع بنجاح. يمكنك الآن متابعة طلباتك من صفحة الحساب.
        </p>

        <div className="payment-success-actions">
          <Link to="/account/my-orders" className="primary-action">
            عرض الطلبات
          </Link>
          <Link to="/" className="secondary-action">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
