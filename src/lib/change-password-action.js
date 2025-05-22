"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function changePassword(prevState, formData) {
  console.log(formData);

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let { data, err } = await supabase.from("users").select("*");

    const profile = data[0];

    if (profile.role_id == 3) {
      return {
        success: false,
        error:
          "You do not have permission to change the password for this account. Please try signing up with your own account for account customization.",
      };
    }

    if (!user) {
      return {
        success: false,
        error: "You must be logged in to change your password",
      };
    }

    const password = formData.get("password");
    const password2 = formData.get("password2");

    if (!password || !password2) {
      return {
        success: false,
        error: "Both password fields are required",
      };
    }

    if (password !== password2) {
      return {
        success: false,
        error: "Passwords should match",
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        error: "Password should be at least 6 characters",
      };
    }

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      return {
        success: false,
        error: error.message || "Failed to update password",
      };
    }
  } catch (error) {
    console.error("Change password error:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }

  revalidatePath("/", "layout");
  redirect("/settings");
}
