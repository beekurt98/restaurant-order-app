"use client";
import { useAuth } from "@/app/components/AuthProvider";
import { useCart } from "@/app/components/CartProvider"
import { toastit } from "@/app/components/helper";
import PageHeader from "@/app/components/PageHeader";
import { supabase } from "@/lib/supabase"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Checkout() {
  const { cart, cartObj, totalPrice, setCart } = useCart();
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [chosenAddress, setChosenAddress] = useState({});
  const addressSelectionRef = useRef(null);
  const router = useRouter();


  useEffect(() => {
    async function getAddr() {
      let { data, error } = await supabase
        .from('addresses')
        .select('*')
      setAddresses(data);
      setChosenAddress(data[0]);

    }
    getAddr();
  }, [])

  function handleAddressSelection(addr) {
    setChosenAddress(addr);
    addressSelectionRef.current.close();
  }

  async function completeOrder(e) {
    e.preventDefault();
    // order
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          paid_price: totalPrice,
          address_id: chosenAddress?.id
        },
      ])
      .select()


    if (error) {
      console.error("Order insert error:", error);
      return;
    }

    const orderDetails = cart.map((item) => {
      return {
        order_id: data[0].id,
        product_id: item.id,
      };
    });

    // order_details
    await supabase.from("order_details").insert(orderDetails).select();

    toastit("Order received!", 1250);
    router.push("/");
    setCart([]);
    localStorage.removeItem("cart");
    localStorage.removeItem("cartObj");
  }


  return (
    <>
      <PageHeader name="Checkout" />
      <div className="page checkout-page">
        <h2>Order Preview</h2>
        <h3>Products</h3>
        <div className="checkout-prev-items">
          {Object.keys(cartObj)?.map((x) => (
            <div className="checkout-prev-item" key={x}>
              <h4>{cartObj[x]?.name}</h4>
              <div>
                <p>Price: ${cartObj[x]?.price} </p>
                <p>Quantity: {cartObj[x]?.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <h3>Address</h3>
        <div className="checkout-address">
          {addresses.length > 0
            ? <>
              <h4>{chosenAddress?.title}</h4>
              <p>{chosenAddress?.city}, {chosenAddress?.state}, {chosenAddress?.street_address}, {chosenAddress?.address_line}</p>
              <button
                className="crud-btn"
                onClick={() => addressSelectionRef.current.showModal()}>
                Edit
              </button>
            </>
            : <>
              <h4>No saved addresses.</h4>
              <Link href="/addresses">Add New Address</Link>
            </>}
        </div>
        <h3>Payment Method</h3>
        <div className="payment-method">
          Mastercard **34
        </div>
        <button disabled={addresses.length == 0 ? true : false} className="order-button" onClick={completeOrder}>Complete Order</button>

        <dialog ref={addressSelectionRef}>
          {
            addresses?.map((x, index) => <div key={index}>
              <h4>{x?.title}</h4>
              <p>{x?.city}, {x?.state}, {x?.street_address}, {x?.address_line}</p>
              <button onClick={() => handleAddressSelection(x)}>Select this</button>
            </div>)
          }
        </dialog>

      </div>
    </>
  )
}