"use client";
import { useAuth } from "@/app/components/AuthProvider";
import { useCart } from "@/app/components/CartProvider"
import PageHeader from "@/app/components/PageHeader";
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
        {
          paid_price: totalPrice
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
      <PageHeader name="Checkout" />
      <div className="page">
        <button onClick={completeOrder}>Complete Order</button>
      </div>
    </>
  )
}