import React, { useState } from "react";
import "./mainNavigation.styles.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { Link } from "react-router-dom";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import CartIcon from "../cart-icon/cart-icon.component";
import { useApp } from "../../context/AppContext";

function MainNavigation() {
  const [cartOpen, setCartOpen] = useState(false);
  const { currentUser, logout } = useApp();
  const toggleCart = () => setCartOpen((open) => !open);

  return (
      <nav className="header">
        <Link className="header__logo" to="/">
          <Logo />
        </Link>

        <ul className="header__nav">
          <li className="header__nav--item">
            <Link className="header__nav--item-link" to="/shop">
              SHOP
            </Link>
          </li>
          {/* <li className="header__nav--item">
            <Link className="header__nav--item-link" to="/contact">
              CONTACT
            </Link>
          </li> */}
          {!currentUser ? (
            <li className="header__nav--item">
              <Link className="header__nav--item-link" to="/signin">
                SIGN/SIGNUP
              </Link>
            </li>
          ) : (
            <li
              className="header__nav--item"
              onClick={logout}
            >
              LOGOUT
            </li>
          )}

          <CartIcon toggleCartHidden={toggleCart} />
        </ul>
        {cartOpen && <CartDropdown toggleCart={toggleCart} />}
      </nav>
  );
}

export default MainNavigation;
