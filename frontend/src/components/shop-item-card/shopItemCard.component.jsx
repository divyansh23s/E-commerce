import React from "react";
import "./shopItemCard.styles.scss";
import CustomButton from "../custom-button/custom-button.component";
import { useApp } from "../../context/AppContext";
const ShopItemCard = ({ item }) => {
  const { addItem } = useApp();
  const { name, imageUrl, price } = item;
  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
        }}
      />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton inverted onClick={() => addItem(item)}>
        Add To Cart
      </CustomButton>
    </div>
  );
};

export default ShopItemCard;
