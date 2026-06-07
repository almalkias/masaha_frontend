import { createContext, useState, useEffect, useContext } from "react";
import apiClient from "../../api/client";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useLoading } from '../contexts/LoadingContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();

  // Add item
  const addToCart = async (productId, buyNow = false) => {
    const isAlreadyInCart = cartItems.some(
      (item) => item.product.id === productId
    );

    if (isAlreadyInCart) {
      if (buyNow) navigate('/cart');
      return { status: "exists" };
    }

    setIsLoading(true);

    try {
      await apiClient.post('/cart/add/', {
        product: productId,
      });
      await fetchCart();
      if (buyNow) navigate('/cart');
      return { status: "added" };
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error);
      return { status: "error" };
    } finally {
      setIsLoading(false);
    }
  };

  // Remove the full item
  const removeFromCart = async (itemId) => {
    setIsLoading(true);

    try {
      await apiClient.delete(`/cart/${itemId}/delete/`);
      // Refresh the cart from the backend
      await fetchCart();
    } catch (error) {
      console.error("Error removing item:", error.response?.data || error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);

    try {
      await apiClient.delete("/cart/clear/");
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error.response?.data || error);
      await fetchCart();
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch the cart in a separate function
  const fetchCart = async () => {
    try {
      const response = await apiClient.get('/cart/');
      setCartItems(response.data.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error.response?.data || error);
    }
  };

  // Subtotal (before tax/discount)
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + Number(item.product.price),
      0
    );
  };

  // Apply coupon — calls backend to validate and get discount amount
  const applyCoupon = async (code) => {
    const cleanedCode = code.trim();

    if (!cleanedCode) {
      return { status: 'error', message: 'ادخل الكوبون' };
    }

    setIsLoading(true);

    try {
      const res = await apiClient.post('/coupons/validate/', {
        code: cleanedCode
      });

      const discount = Number(res.data.discount_amount) || 0;

      setCoupon({
        code: res.data.code,
        discountAmount: discount
      });

      return {
        status: 'success',
        discountAmount: discount
      };

    } catch (error) {
      return {
        status: 'error',
        message: error.response?.data?.error || 'كوبون غير صالح'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const removeCoupon = () => setCoupon(null);

  const getTax = () => getCartTotal() * 15 / 115;

  const getDiscount = () => coupon?.discountAmount || 0;

  const getFinalTotal = () => {
    const total = getCartTotal();
    const discount = getDiscount();

    return Math.max(total - discount, 0);
  };

  // Total count
  const totalQuantity = () => {
    return cartItems.length;
  };

  // Initialize cart state
  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      fetchCart().finally(() => setIsLoading(false));
    } else {
      setCartItems([]);
    }
  }, [isLoggedIn]);

  const revalidateCoupon = async (code) => {
    try {
      const res = await apiClient.post('/coupons/validate/', { code });

      setCoupon(prev => ({
        ...prev,
        discountAmount: Number(res.data.discount_amount) || 0
      }));

    } catch {
      setCoupon(null);
    }
  };

  useEffect(() => {
    if (coupon) {
      revalidateCoupon(coupon.code); // يعيد التحقق
    }
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        coupon,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        applyCoupon,
        removeCoupon,
        getTax,
        getDiscount,
        getFinalTotal,
        totalQuantity,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
