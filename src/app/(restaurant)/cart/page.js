"use client";
import { useAuth } from "@/app/components/AuthProvider";
import { useCart } from "@/app/components/CartProvider";
import PageHeader from "@/app/components/PageHeader";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Cart() {
  const { cart, cartObj, calculatePrice, updateCartObj, totalPrice, handleQuantityIncrease, handleQuantityDecrease } = useCart();
  const { user } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    updateCartObj(); 
    calculatePrice(); 
    setIsReady(true); 
  }, [cart]);

  if (!isReady) return null; 

  return (
    <>
      <PageHeader name={"Cart"} />
      <div className="page">

        <div className="cart-items single-item">
          {cart.length > 0
            ? Object.keys(cartObj)?.map((x) => (
              <div className="cart-item" key={x}>
                <img src={cartObj[x]?.img_url} alt={cartObj[x]?.name} />
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
            ))
            : <p>No items yet.</p>}
        </div>

      </div>
        <div className="price-info">
          <p>Total: ${totalPrice}</p>
          <Link className="button" href={user ? "/checkout" : "/login"}>Checkout</Link>

        </div>
    </>
  );
}
