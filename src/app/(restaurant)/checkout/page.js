"use client";
import { useAuth } from "@/app/components/AuthProvider";
import { useCart } from "@/app/components/CartProvider"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { cart, cartObj, totalPrice } = useCart();
  const { user } = useAuth();
  async function completeOrder(e) {
    e.preventDefault();
    // order
    const { data, error } = await supabase
      .from('orders')
      .insert([
        { price_paid: totalPrice
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


    localStorage.removeItem("cart");
    localStorage.removeItem("cartObj");
  }

  return (
    <>
      <h2>Checkout</h2>
      <button onClick={completeOrder}>Complete Order</button>
    </>
  )
}