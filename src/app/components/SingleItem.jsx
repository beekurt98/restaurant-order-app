import Link from "next/link";
import { useCart } from "./CartProvider";
import { useRouter } from "next/navigation";

export default function SingleItem({ x, hasQty = true, inProducts = true, selectProduct }) {
  const { cartObj, addProductToCart, handleQuantityIncrease, handleQuantityDecrease } = useCart();
  const router = useRouter();

  function handleNav(x) {
    if (inProducts) {
      selectProduct(x);
    } else {
      router.push(`/products/${x.id}`);
    }
  }

  return (
    <>
      <div className="product-item single-item" key={x?.id}>
        <img onClick={() => handleNav(x)} className="product-img" src={x?.img_url} />
        <h3 onClick={() => handleNav(x)}>{x?.name}</h3>
        {/* <h3><Link href={`/products/${x?.id}`}>{x?.name}</Link></h3> */}

        <div className="product-quantity-controls">
          <p>${x?.price}</p>
          {
            hasQty
            && (Object.keys(cartObj).includes(x.name)
              ?
              <div>
                <button onClick={() => handleQuantityDecrease(x)}>-</button>
                <span>{cartObj[x?.name]?.quantity}</span>
                <button onClick={() => handleQuantityIncrease(x)}>+</button>
              </div>
              : <button onClick={() => addProductToCart(x)}>+</button>
            )
          }
        </div>
      </div>
    </>
  )

}