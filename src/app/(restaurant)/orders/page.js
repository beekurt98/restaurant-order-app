"use client";
import { useAuth } from "@/app/components/AuthProvider";
import PageHeader from "@/app/components/PageHeader";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  const statusList = {
    1: "⟳ Order Received",
    2: "⟳ Order is being prepared",
    3: "✓ Order Ready",
    4: "✓ Order Delivered",
    5: "× Order Cancelled"
  }

  useEffect(() => {
    async function getData() {
      let { data, error } = await supabase
        .from("orders")
        .select(`
        id,
        created_at,
        status_id,
        paid_price,
        order_details ( 
          product_id,
          products ( name )
        )
      `)
        .order('created_at', { ascending: false })
      setOrders(data);

    }

    getData();
  }, [user?.id])

  function groupItems(orderDetails) {
    const itemMap = {};
    orderDetails.forEach(({ product_id, products }) => {
      if (itemMap[product_id]) {
        itemMap[product_id].count += 1;
      } else {
        const productName = products.name
        itemMap[product_id] = { productName, count: 1 };
      }
    });
    return Object.values(itemMap);
  };
  return (
    <>
      <PageHeader name="Orders" />
      <div className="page">
        <div className="orders-list">
          {orders && orders?.map((x) => (
            <div className="order-item" key={x?.id}>
              <h3>Order Number #{x?.id}</h3>
              <p className="order-date">{new Date(x?.created_at).toLocaleString()}</p>
              <p>Total: ${x?.paid_price}</p>
              <p>{statusList[x?.status_id]}</p>
              <p className="order-products">
                {groupItems(x?.order_details).map((item, index) => (
                  <span className="order-qty" key={index}> {item?.productName} ({item?.count} pcs)</span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}