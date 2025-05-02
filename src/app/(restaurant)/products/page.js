"use client";
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase";
import { useCart } from "@/app/components/CartProvider";
import PageHeader from "@/app/components/PageHeader";
import SingleItem from "@/app/components/SingleItem";
import Categories from "@/app/components/Categories";

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
          img: item.img_url
        };
      }
    });

    setCartObj(newCartObj);

    localStorage.setItem("cartObj", JSON.stringify(newCartObj));
  }, [cart]);

  return (
    <>
      <PageHeader name={"Products"} />
      <div className="page">
        <Categories categories={categories} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} setCategories={setCategories} />
        <h3 className="category-title">{currentCategory?.name}</h3>
        <div className="products-list">
          {
            products
              ?.filter(x => x?.category_id == currentCategory?.id)
              .map(x => <SingleItem key={x.id} x={x} />)
          }
        </div>
      </div>
    </>
  )
}