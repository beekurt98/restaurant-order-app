"use client";
import { useCart } from "@/app/components/CartProvider";
import PageHeader from "@/app/components/PageHeader";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { use } from "react";

export default function ProductItem({ params }) {
  const { id } = use(params);
  const { cartObj, addProductToCart, handleQuantityIncrease, handleQuantityDecrease } = useCart();
  const [product, setProduct] = useState({});

  useEffect(() => {
    async function getProduct() {
      let { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq("id", id)
        .single()

      setProduct(product);
    }

    getProduct();
  }, [])

  return (
    <>
      <PageHeader name="Product" />
      <main className="product-page">
        <article className="product-container">
          <figure className="product-image-container">
            <img
              src={product?.img_url}
              alt={product?.name || 'Product image'}
              className="product-image"
              loading="lazy"/>
          </figure>

          <div className="product-details">
            <h1 className="product-title">{product?.name}</h1>
            <p className="product-description">{product?.description}</p>

            <div className="product-actions">
              {Object.keys(cartObj).includes(product?.name) ? (
                <div className="quantity-control">
                  <button
                    onClick={() => handleQuantityDecrease(product)}
                    aria-label="Decrease quantity"
                    className="quantity-button">
                    −
                  </button>
                  <span className="quantity-value">
                    {cartObj[product?.name]?.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityIncrease(product)}
                    aria-label="Increase quantity"
                    className="quantity-button">
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="add-to-cart-button"
                  onClick={() => addProductToCart(product)}
                  aria-label={`Add ${product?.name} to cart`}>
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        </article>
      </main>
    </>
  )
}