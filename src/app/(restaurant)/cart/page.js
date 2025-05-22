"use client";
import { useAuth } from "@/app/components/AuthProvider";
import { useCart } from "@/app/components/CartProvider";
import PageHeader from "@/app/components/PageHeader";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Cart() {
  const {
    cart,
    setCart,
    cartObj,
    calculatePrice,
    updateCartObj,
    totalPrice,
    handleQuantityIncrease,
    handleQuantityDecrease,
  } = useCart();
  const { user } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    updateCartObj();
    calculatePrice();
    setIsReady(true);
  }, [cart]);

  if (!isReady) return null;

  function emptyCart() {
    setCart([]);
    localStorage.removeItem("cart");
    localStorage.removeItem("cartObj");
  }

  return (
    <>
      <PageHeader name={"Cart"} />
      <div className="page">
        <div className="cart-items single-item">
          {cart.length > 0 ? (
            <>
              <button onClick={emptyCart} className="empty-cart-btn">
                {deleteSvg} Empty cart
              </button>
              {Object.keys(cartObj)?.map((x) => (
                <div className="cart-item" key={x}>
                  <img src={cartObj[x]?.img_url} alt={cartObj[x]?.name} />
                  <div>
                    <h3>
                      <Link href={`/products/${cartObj[x]?.id}`}>
                        {cartObj[x]?.name}
                      </Link>
                    </h3>
                    <p className="item-price">Price: ${cartObj[x]?.price}</p>
                    <div className="product-quantity-controls">
                      <button
                        onClick={() => handleQuantityDecrease(cartObj[x])}
                        className="decrease-btn"
                      >
                        -
                      </button>
                      <span>{cartObj[x]?.quantity}</span>
                      <button
                        onClick={() => handleQuantityIncrease(cartObj[x])}
                        className="increase-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>No items yet.</p>
          )}
        </div>
      </div>
      <div className="price-info">
        <p>Total: ${totalPrice}</p>
        <Link className="button" href={user ? "/checkout" : "/login"}>
          Checkout
        </Link>
      </div>
    </>
  );
}

export const deleteSvg = (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 11V17"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 11V17"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 7H20"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
