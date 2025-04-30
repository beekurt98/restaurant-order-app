"use client";
import { useCart } from "@/app/components/CartProvider"
import Link from "next/link";
import { useEffect } from "react";

export default function Cart() {
  const { cart, cartObj, calculatePrice, updateCartObj, totalPrice, handleQuantityIncrease, handleQuantityDecrease } = useCart();
  console.log(cart);

  useEffect(() => {
    calculatePrice();
    updateCartObj();
  }, [cart])


  return (
    <>
      <div className="cart-items">
        {Object.keys(cartObj)?.map((x) => (
          <div className="cart-item" key={x}>
            <img src={cartObj[x]?.img} alt={cartObj[x]?.name} />
            <div>
              <h3>{cartObj[x]?.name}</h3>
              <p>Fiyat: {cartObj[x]?.price} $</p>
              <div className="cart-item-price">
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
        Toplam Fiyat : ${totalPrice}
      </div>
      <Link href="/checkout">Order</Link>
    </>
  )
}