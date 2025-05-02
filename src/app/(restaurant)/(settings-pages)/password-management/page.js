"use client";

import Input from "@/app/components/Input";
import PageHeader from "@/app/components/PageHeader";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PasswordMgmt() {
  const [warning, setWarning] = useState("");
  const router = useRouter();

  async function changePassword(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { password, password2 } = Object.fromEntries(formData);
    
    if (password !== password2) {
      setWarning("Passwords should match.");
      return;
    }

    const { data, error } = await supabase.auth.updateUser({
      password: password
    })

    router.push("/settings");


  }
  return (
    <>
      <PageHeader name={"Password Management"} />
      <div className="page">
        <form onSubmit={changePassword}>
          <Input type="password" name={"password"} placeholder="password" />
          <Input type="password" name={"password2"} placeholder="retype your password" />
          <button className="link-btn">Change Password</button>
        </form>
      </div>
    </>
  )
}