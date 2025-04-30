"use client";
import { useCart } from "@/app/components/CartProvider";
import PageHeader from "@/app/components/PageHeader";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Cart() {
  const { cart, cartObj, calculatePrice, updateCartObj, totalPrice, handleQuantityIncrease, handleQuantityDecrease } = useCart();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    updateCartObj(); // Refresh state
    calculatePrice(); // Recalculate total
    setIsReady(true); // Wait until cart is ready to render
  }, [cart]);

  if (!isReady) return null; // Avoid hydration mismatch

  return (
    <>
      <PageHeader name={"Cart"} />
      <div className="page">

        <div className="cart-items">
          {Object.keys(cartObj)?.map((x) => (
            <div className="cart-item" key={x}>
              <img src={cartObj[x]?.img} alt={cartObj[x]?.name} />
              <div>
                <h3>{cartObj[x]?.name}</h3>
                <p className="item-price">Price: ${cartObj[x]?.price}</p>
                <div className="product-quantity-controls">
                  <button
                    onClick={() => handleQuantityDecrease(cartObj[x])}
                    className="decrease-btn">-</button>
                  <span>{cartObj[x]?.quantity}</span>
                  <button
                    onClick={() => handleQuantityIncrease(cartObj[x])}
                    className="increase-btn">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="price-info">
          <p>Total: ${totalPrice}</p>
          <Link className="button" href="/checkout">Checkout</Link>

        </div>

      </div>
    </>
  );
}
