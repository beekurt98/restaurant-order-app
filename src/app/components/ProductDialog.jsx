"use client";

import { useCart } from "./CartProvider";

export default function ProductDialog({ selectedProduct, productRef }) {
  const { cartObj, handleQuantityDecrease, handleQuantityIncrease, addProductToCart } = useCart();

  return (
    <>
    <dialog
          ref={productRef}
          className="product-dialog"
          aria-labelledby="product-dialog-title"
          aria-modal="true"
        >
          <div className="dialog-header">
            <button
              onClick={() => productRef.current.close()}
              aria-label="Close product details"
              className="close-button"
            >
              &times;
            </button>
          </div>

          <div className="product-image-container">
            <img
              src={selectedProduct?.img_url}
              alt={selectedProduct?.name || 'Product image'}
              className="product-image"
              loading="lazy"
            />
          </div>

          <div className="product-details">
            <h3 id="product-dialog-title" className="product-title">
              {selectedProduct?.name}
            </h3>
            <p className="product-description">
              {selectedProduct?.description}
            </p>

            <div className="product-actions">
              <p className="product-price">
                ${selectedProduct?.price?.toFixed(2)}
              </p>

              {Object.keys(cartObj).includes(selectedProduct?.name) ? (
                <div className="quantity-controls">
                  <button
                    onClick={() => handleQuantityDecrease(selectedProduct)}
                    aria-label="Decrease quantity"
                    className="quantity-button"
                  >
                    −
                  </button>
                  <span className="quantity-display">
                    {cartObj[selectedProduct?.name]?.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityIncrease(selectedProduct)}
                    aria-label="Increase quantity"
                    className="quantity-button"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addProductToCart(selectedProduct)}
                  className="add-to-cart-button"
                  aria-label={`Add ${selectedProduct?.name} to cart`}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </dialog>
    </>
  )
}