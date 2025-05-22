"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function login(prevState, queryData) {
  const email = queryData.get("email");
  const password = queryData.get("password");

  if (email.trim() === "") {
    return {
      success: false,
      error: "Email can't be empty",
      type: "email",
    };
  }

  if (password.trim() === "") {
    return {
      success: false,
      error: "Password can't be empty",
      type: "password",
    };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }

  revalidatePath("/", "layout");
  redirect("/settings");
}
