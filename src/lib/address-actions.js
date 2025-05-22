import { createClient } from "@/utils/supabase/client";

const supabase = createClient();
const {
  data: { user },
} = await supabase.auth.getUser();

export async function getAddresses() {
  if (user?.id) {
    let { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", user.id);

    if (data) {
      return data;
    } else if (error) {
      console.error("Error fetching addresses:", error);
    }
  }
}

export async function insertAddresses(newAddress) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const address = { ...newAddress, user_id: user.id };
  const { data, error } = await supabase
    .from("addresses")
    .insert([address])
    .select();

  return { data, error };
}

export async function updateAddresses(updatedAddress, currentAddresssId) {
  const { data, error } = await supabase
    .from("addresses")
    .update(updatedAddress)
    .eq("id", currentAddresssId)
    .select();
  return { data, error };
}

export async function deleteAddresses(id) {
  const { error } = await supabase.from("addresses").delete().eq("id", id);
  return error;
}
