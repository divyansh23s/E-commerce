import React from "react";
import "./checkout.styles.scss";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
// import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";
import { useApp } from "../../context/AppContext";

const CheckoutPage = () => {
  const { cartItems, cartTotal } = useApp();
  return <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block">
        <span>Product</span>
      </div>

      <div className="header-block">
        <span>Description</span>
      </div>

      <div className="header-block">
        <span>Quantity</span>
      </div>

      <div className="header-block">
        <span>Price</span>
      </div>

      <div className="header-block">
        <span>Remove</span>
      </div>
    </div>
    {cartItems &&
      cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem._id} cartItem={cartItem} />
      ))}

    <div className="total">
      <span>TOTAL : ${cartTotal}</span>
    </div>

    {/* <StripeCheckoutButton price={cartTotal} /> */}
  </div>;
};

export default CheckoutPage;
