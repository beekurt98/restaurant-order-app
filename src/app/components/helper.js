import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";

export async function toastit(toastMsg, toastDuration) {
  toast(toastMsg, {
    duration: toastDuration
  })
}


export async function completeOrder(e) {
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

  toastit("Order received!", 1000);
  router.push("/");
  localStorage.removeItem("cart");
  localStorage.removeItem("cartObj");
}

export async function changePassword(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { password, password2 } = Object.fromEntries(formData);

  
  let { data: users, err } = await supabase
    .from('users')
    .select('*')

  if (users[0].role_id == 3) return "You do not have permission to change the password for this account. Please try signing up with your own account for account customization.";

  if (password !== password2) {
    return "Passwords should match.";
  }

  const { data, error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    return error.message;
  } else {
    return "SUCCESS";
  }
}