import { useState, useContext, useEffect, useRef } from "react";
import {
  Elements,
  useStripe,
  useElements,
  CardElement
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import apiClient from "../../api/client";
import { CartContext } from "../contexts/CartContext";
import { useLoading } from "../contexts/LoadingContext";
import { Link, useNavigate } from "react-router-dom";
import "./Payment.css";

import logo from "../../assets/images/logo-new.png";

// Stripe public key
const stripePromise = loadStripe("pk_test_51TDoAPAbWn7WhVRQpxmIh8idOanR9hCI78qiUfODQqQaKMJEQwbknHVduLAGT9KXiFtlE4tswJiUEcVdRRuJEdGy00GArG8emF");

// Form component
const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const { getCartTotal, getTax, getDiscount, getFinalTotal, coupon } = useContext(CartContext);
  const { setIsLoading } = useLoading();

  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [cardName, setCardName] = useState(""); // Cardholder name

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    setIsLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: cardName, // Required cardholder name
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        navigate("/payment-success");
      }

    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء الدفع");
    } finally {
      setProcessing(false);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form-container">

      <h2>طريقة الدفع</h2>

      {/* Price breakdown */}
      <div className="payment-price-breakdown">
        <div className="payment-price-row">
          <span>المجموع الجزئي</span>
          <span>{getCartTotal().toFixed(2)} ر.س</span>
        </div>
        <div className="payment-price-row">
          <span>الضريبة (15%)</span>
          <span>{getTax().toFixed(2)} ر.س</span>
        </div>
        {coupon && (
          <div className="payment-price-row payment-discount-row">
            <span>الخصم ({coupon.code})</span>
            <span>- {getDiscount().toFixed(2)} ر.س</span>
          </div>
        )}
        <div className="payment-price-row payment-total-row">
          <span>الإجمالي</span>
          <span>{getFinalTotal().toFixed(2)} ر.س</span>
        </div>
      </div>

      {/* Cardholder name */}
      <input
        type="text"
        placeholder="اسم صاحب البطاقة"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
        required
        className="card-name-input"
      />

      {/* Card details */}
      <div className="card-element-wrapper">
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: "16px",
                fontFamily: "Cairo, sans-serif",
              },
            },
          }}
        />
      </div>

      <button disabled={!stripe || processing}>
        {processing ? "جارٍ الدفع..." : "إكمال عملية الدفع"}
      </button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
};


// Main page
function PaymentPage() {
  const [clientSecret, setClientSecret] = useState(null);
  const { setIsLoading } = useLoading();
  const { coupon } = useContext(CartContext);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    const createIntent = async () => {
      setIsLoading(true);

      try {
        const body = coupon ? { coupon_code: coupon.code } : {};
        const res = await apiClient.post("/payments/intent/", body);
        setClientSecret(res.data.client_secret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      } finally {
        setIsLoading(false);
      }
    };

    createIntent();
  }, [])

  return (
    <div className="payment">

      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="مسحة" className="site-logo" />
        </Link>
      </div>

      {/* Stripe payment form */}
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            locale: "ar",
            appearance: {
              theme: "stripe",
              variables: {
                fontFamily: "Cairo, sans-serif",
                direction: "rtl",
              },
            },
          }}
        >
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
}

export default PaymentPage;
