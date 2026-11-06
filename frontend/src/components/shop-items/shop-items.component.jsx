import React, { useEffect, useState } from "react";
import "./shop-items.styles.scss";
import ShopItemCard from "../shop-item-card/shopItemCard.component";
import axios from "axios";
const ShopItem = ({ match }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setProduct(null);
    setError("");
    setLoading(true);
    axios
      .get(`/api/v1/product/${match.params.catId}`)
      .then((response) => {
        if (active) {
          setProduct(response.data[0] || null);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setError("Unable to load products. Please try again.");
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [match.params.catId]);

  return (
    <main className="products">
      {error && <p>{error}</p>}
      {loading && <p>Loading products...</p>}
      {!loading && !error && !product && <p>No products found in this category.</p>}
      {product && product.items &&
        product.items.map((item) => (
          <ShopItemCard key={item._id} item={item} />
        ))}
    </main>
  );
};

export default ShopItem;
