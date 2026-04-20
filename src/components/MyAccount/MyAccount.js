import { useState, useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import useRequireAuth from '../hooks/useRequireAuth';
import down_arrow from '../../assets/images/down-arrow.png';
import up_arrow from '../../assets/images/up-arrow.png';
import "./MyAccount.css";

function MyAccount() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  useRequireAuth(isLoggedIn)

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  }

  const closeMenu = () => {
    setIsMenuVisible(false);
  }

  return (
    <div className='my-account'>
      <div className='wraper'>
        <div className="toggle-menu" onClick={toggleMenu}>
          <p>حسابي</p>
          {isMenuVisible ?
            <img src={up_arrow} alt="" /> : <img src={down_arrow} alt="" />}
        </div>
        {isMenuVisible && (
          <ul className="navigation-hover">
            <li>
              <Link to="account-settings" onClick={closeMenu}>الحساب الشخصي</Link>
            </li>
            <li>
              <Link to="my-favourite" onClick={closeMenu}>المفضلة</Link>
            </li>
            <li>
              <Link to="my-orders" onClick={closeMenu}>الطلبات</Link>
            </li>
            <li>
              <Link to="my-notifications" onClick={closeMenu}>الإشعارات</Link>
            </li>
          </ul>
        )}
        <ul className="navigation">
          <li>
            <NavLink to="account-settings" activeclassname="active">الحساب الشخصي</NavLink>
          </li>
          <li>
            <NavLink to="my-favourite" activeclassname="active">المفضلة</NavLink>
          </li>
          <li>
            <NavLink to="my-orders" activeclassname="active">الطلبات</NavLink>
          </li>
          <li>
            <NavLink to="my-notifications" activeclassname="active">الإشعارات</NavLink>
          </li>
        </ul>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MyAccount;
