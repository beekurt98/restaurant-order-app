"use client";

import { useActionState, useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import Input from "../components/Input";
import UserInfo from "../components/UserInfo";
import Link from "next/link";
import login from "@/lib/login-actions";

export default function Login() {
  const [state, formAction, pending] = useActionState(login, null);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (state?.error) {
      setWarning(state.error);
    }
  }, [state]);

  return (
    <>
      <PageHeader name={"Login"} />
      <div className="page">
        <UserInfo text={"Back for another bowl of goodness?"} />
        {
          <>
            <form action={formAction} autoComplete="off">
              <Input name={"email"} type={"type"} placeholder={"Email"} />
              <Input
                name={"password"}
                type={"password"}
                placeholder={"Password"}
              />
              <button>Login</button>
              <Link className="auth-other-btn" href={"/signup"}>
                Sign Up
              </Link>
              <p style={{ textAlign: "center" }}>{warning ? warning : ""}</p>
            </form>
          </>
        }
      </div>
    </>
  );
}
