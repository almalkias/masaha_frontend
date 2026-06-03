import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import Search from "../Search/Search";
import global from "../../assets/images/global.svg";
import logo from "../../assets/images/logo-new.png";
import user from "../../assets/images/user.svg";
import shopping_cart from "../../assets/images/shopping-cart.svg";
import heart from "../../assets/images/heart.svg";
import Hamburger from "../../assets/images/Hamburger_icon.svg";
import settings from "../../assets/images/account-settings.svg";
import "./Header.css";

function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { cartItems, totalQuantity } = useContext(CartContext);
  const { logout, authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "الرئيسية" },
    { to: "/about", label: "من نحن" },
    { to: "/shopping", label: "المعرض" },
  ];

  const accountLinks = [
    { to: "/account/account-settings", icon: user, alt: "الحساب" },
    { to: "/account/my-favourite", icon: heart, alt: "المفضلة" },
  ];

  const handleLogout = async () => {
    if (!window.confirm("هل أنت متأكد أنك تريد تسجيل الخروج؟")) return;
    await logout();
    navigate(location.state?.from || "/");
  };

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  useEffect(() => {
    if (!isMenuVisible) return undefined;

    const originalOverflow = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMenuVisible]);

  const renderSocialLink = ({ className, onClick } = {}) => (
    <ScrollLink
      to="social"
      smooth={true}
      duration={500}
      className={className}
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      تواصل معنا
    </ScrollLink>
  );

  return (
    <div className="header">
      <div className="bottom-wraper">
        <div className="bottom-section">
          <div className="center">
            <Link to="/">
              <img src={logo} alt="مسحة" className="site-logo" />
            </Link>
            <img
              className="toggle-menu"
              src={Hamburger}
              alt=""
              onClick={toggleMenu}
            />
            {isMenuVisible && (
              <>
                <div className="page-overlay"></div>
                <div className={`full-page-menu ${isMenuVisible ? "open" : ""}`}>
                  <span className="close-btn" onClick={toggleMenu}>
                    &times;
                  </span>
                  <Link to="/" className="logo-hover">
                    <img src={logo} alt="مسحة" className="site-logo" />
                  </Link>
                  <ul className="nav-hover">
                    {navLinks.map(({ to, label }) => (
                      <li key={to}>
                        <Link to={to} onClick={toggleMenu}>
                          {label}
                        </Link>
                      </li>
                    ))}
                    <li>{renderSocialLink({ onClick: toggleMenu })}</li>
                  </ul>
                </div>
              </>
            )}
          </div>


          <div className="right">
            {authToken ? (
              <>
                <div className="dropdown circle-bg">
                  <img src={settings} alt="تسجيل الخروج" onClick={handleLogout} />
                </div>

                {accountLinks.map(({ to, icon, alt }) => (
                  <Link key={to} to={to} className="circle-bg">
                    <img src={icon} alt={alt} />
                  </Link>
                ))}

                <Link to="/cart" className="circle-bg">
                  {cartItems && cartItems.length > 0 && (
                    <div className="quantity-circle">{totalQuantity()}</div>
                  )}
                  <img src={shopping_cart} alt="السلة" />
                </Link>
              </>
            ) : (
              <div className="auth-actions">
                <Link to="/login" className="auth-btn auth-btn-secondary">
                  تسجيل الدخول
                </Link>
                <Link to="/register" className="auth-btn auth-btn-primary">
                  إنشاء حساب
                </Link>
              </div>
            )}

            {/* <a href="!#" className="circle-bg global-two">
              <img src={global} alt="" />
            </a> */}
          </div>


          <div className="left">
            <a href="!#" className="circle-bg global-one">
              <img src={global} alt="" />
            </a>
            <Search />
          </div>
          <ul className="nav">
            <li>{renderSocialLink({ className: "nav-link" })}</li>
            {navLinks
              .slice()
              .reverse()
              .map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to} activeclassname="active">
                    {label}
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div >
  );
}

export default Header;
