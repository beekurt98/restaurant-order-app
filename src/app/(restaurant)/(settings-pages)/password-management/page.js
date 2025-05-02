"use client";

import Input from "@/app/components/Input";
import PageHeader from "@/app/components/PageHeader";
import UserInfo from "@/app/components/UserInfo";
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

    if (error) {
      setWarning(error.message);
    } else {
      router.push('/');
    }

    router.push("/settings");


  }
  return (
    <>
      <PageHeader name={"Password"} />
      <div className="page">
        <UserInfo />
        <form autoComplete="off" onSubmit={changePassword}>
          <Input type="password" name={"password"} placeholder="Password" />
          <Input type="password" name={"password2"} placeholder="Retype your password" />
          <button>Change Password</button>
          <p style={{ textAlign: "center" }}>{
            warning ? warning : ""
          }</p>
        </form>
      </div>
    </>
  )
}