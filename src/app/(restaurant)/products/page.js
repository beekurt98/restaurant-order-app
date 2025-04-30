"use client";
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase";
import { useCart } from "@/app/components/CartProvider";

export default function Products() {
  const { cart, cartObj, setCartObj, addProductToCart, handleQuantityIncrease, handleQuantityDecrease } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({});

  useEffect(() => {
    async function getData() {
      let { data: categories, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort', { ascending: true })
      setCategories(categories);
      setCurrentCategory(categories[0]);

      let { data: products, err } = await supabase
        .from('products')
        .select('*')
      setProducts(products);

    }

    getData();
  }, [])

  useEffect(() => {
    if (!Array.isArray(cart)) return;

    const newCartObj = {};
    cart.forEach(item => {
      if (newCartObj[item.name]) {
        newCartObj[item.name].quantity++;
      } else {
        newCartObj[item.name] = {
          name: item.name,
          id: item.id,
          quantity: 1,
          price: item.price,
          img: item.img
        };
      }
    });

    setCartObj(newCartObj);

    localStorage.setItem("cartObj", JSON.stringify(newCartObj));
  }, [cart]);

  return (
    <>
      <div className="categories-list">
        {
          categories?.map(x => <span
            style={{ marginRight: "10px" }}
            onClick={() => setCurrentCategory(x)}
            key={x?.id}>
            {x?.name}
          </span>)
        }
      </div>
      <div className="products-list">
        {
          products
            ?.filter(x => x?.category_id == currentCategory?.id)
            .map(x => <div key={x?.id}>
              <img src={x?.img_url} />
              <h3>{x?.name}</h3>
              <p>${x?.price}</p>
              <div className="product-quantity-controls">
                {
                  Object.keys(cartObj).includes(x.name)
                    ?
                    <>
                      <button className="cart-decrease-btn cart-quantity-control" onClick={() => handleQuantityDecrease(x)}>-</button>
                      <span className="cart-quantity">{cartObj[x?.name]?.quantity}</span>
                      <button className="cart-increase-btn cart-quantity-control" onClick={() => handleQuantityIncrease(x)}>+</button>
                    </>
                    : <button className="add-to-cart-btn" onClick={() => addProductToCart(x)}>+</button>
                }
              </div>
            </div>)
        }
      </div>
    </>
  )
}