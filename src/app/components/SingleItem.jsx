import { useCart } from "./CartProvider";

export default function SingleItem({ x, hasQty=true }) {
  const { cart, cartObj, setCartObj, addProductToCart, handleQuantityIncrease, handleQuantityDecrease } = useCart();


  return (
    <>
      <div className="product-item single-item" key={x?.id}>
        <img className="product-img" src={x?.img_url} />
        <h3>{x?.name}</h3>
        <div className="product-quantity-controls">
          <p>${x?.price}</p>
          {
           hasQty
            && (Object.keys(cartObj).includes(x.name)
              ?
              <div>
                <button className="cart-decrease-btn cart-quantity-control" onClick={() => handleQuantityDecrease(x)}>-</button>
                <span className="cart-quantity">{cartObj[x?.name]?.quantity}</span>
                <button className="cart-increase-btn cart-quantity-control" onClick={() => handleQuantityIncrease(x)}>+</button>
              </div>
              : <button className="add-to-cart-btn" onClick={() => addProductToCart(x)}>+</button>
          )
            }
        </div>
      </div>
    </>
  )

}