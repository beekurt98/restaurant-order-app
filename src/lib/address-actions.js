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

export function insertAddresses() {}

export function updateAddresses() {}

export function deleteAddresses() {}
