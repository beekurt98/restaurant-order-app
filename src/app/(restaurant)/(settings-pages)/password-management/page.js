"use client";

import Input from "@/app/components/Input";
import PageHeader from "@/app/components/PageHeader";
import UserInfo from "@/app/components/UserInfo";
import changePassword from "@/lib/change-password-action";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export default function PasswordMgmt() {
  const [state, formAction, pending] = useActionState(changePassword, null);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (state?.error) {
      setWarning(state.error);
    }
  }, [state]);

  return (
    <>
      <PageHeader name={"Password"} />
      <div className="page">
        <UserInfo />
        <form autoComplete="off" action={formAction}>
          <Input type="password" name={"password"} placeholder="Password" />
          <Input
            type="password"
            name={"password2"}
            placeholder="Confirm your password"
          />
          <button>Change Password</button>
          <p style={{ textAlign: "center" }}>{warning ? warning : ""}</p>
        </form>
      </div>
    </>
  );
}
