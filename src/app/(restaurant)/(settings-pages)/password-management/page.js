"use client";

import Input from "@/app/components/Input";
import PageHeader from "@/app/components/PageHeader";
import UserInfo from "@/app/components/UserInfo";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { changePassword } from "@/app/components/helper";

export default function PasswordMgmt() {
  const [warning, setWarning] = useState("");
  const router = useRouter();

  function handlePasswordChange(e) {
    const passwordResponse = changePassword(e);
    setWarning(passwordResponse);
    if (passwordResponse == "SUCCESS") {
      router.push("/settings");
    }
  }


  return (
    <>
      <PageHeader name={"Password"} />
      <div className="page">
        <UserInfo />
        <form autoComplete="off" onSubmit={handlePasswordChange}>
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