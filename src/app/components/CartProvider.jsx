"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toastit } from "./helper";
const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  
  const [cartObj, setCartObj] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCartObj = localStorage.getItem("cartObj");
      return savedCartObj ? JSON.parse(savedCartObj) : {};
    }
    return {};
  });
  
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (cart.length > 0) {
      updateCartObj();
      calculatePrice();
    }
  }, [cart]);

  function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
  }

  function handleQuantityIncrease(product) {
    setCart((prev) => {
      const updatedCart = [...prev, product];
      if (typeof window !== 'undefined') {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
      return updatedCart;
    });
    toastit("Product added to cart.", 750);
  }  

  function handleQuantityDecrease(product) {
    setCart((prev) => {
      const updatedCart = [...prev];
      const productToRemoveIndex = updatedCart.findIndex(x => x.id === product.id);
      if (productToRemoveIndex !== -1) {
        updatedCart.splice(productToRemoveIndex, 1);
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
      return updatedCart;
    });
    toastit("Product removed from cart.", 750);
  }

  function addProductToCart(product) {
    setCart((prev) => {
      const updatedCart = [...prev, product];
      if (typeof window !== 'undefined') {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
      return updatedCart;
    });
    toastit("Product added to cart.", 750);
  }

  function updateCartObj() {
    const newObj = {};
    cart.forEach((item) => {
      if (newObj[item.name]) {
        newObj[item.name].quantity++;
      } else {
        newObj[item.name] = {
          name: item.name,
          id: item.id,
          quantity: 1,
          price: item.price,
          img_url: item.img_url,
        };
      }
    });
    setCartObj(newObj);
    if (typeof window !== 'undefined') {
      localStorage.setItem("cartObj", JSON.stringify(newObj));
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }

  function calculatePrice() {
    let fullPrice = 0;
    cart.forEach((x) => (fullPrice += x.price));
    let lastPrice = parseFloat(fullPrice.toString()).toFixed(2);
    setTotalPrice(lastPrice);
    return lastPrice;
  }

  const values = {
    cart, 
    setCart, 
    cartObj, 
    setCartObj, 
    capitalize, 
    addProductToCart, 
    handleQuantityIncrease, 
    handleQuantityDecrease, 
    updateCartObj,
    calculatePrice,
    totalPrice
  };

  return (
    <CartContext.Provider value={values}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}