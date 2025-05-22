"use client";

import { useActionState, useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import Input from "../components/Input";
import UserInfo from "../components/UserInfo";
import Link from "next/link";
import signUp from "@/lib/signup-actions";

export default function Signup() {
  const [state, formAction, pending] = useActionState(signUp, null);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (state?.error) {
      setWarning(state.error);
    }
  }, [state]);

  return (
    <>
      <PageHeader name={"Sign Up"} />
      <div className="page">
        <UserInfo text="One small step for you, one giant leap for ramen-kind." />
        {
          <form action={formAction} autoComplete="off">
            <Input placeholder="Name" name="name" />
            <Input type="email" placeholder="Email" name="email" />
            <Input type="password" placeholder="Password" name="password" />
            <button>Sign Up</button>
            <Link className="auth-other-btn" href={"/login"}>
              Log in
            </Link>
            <p style={{ textAlign: "center" }}>{warning ? warning : ""}</p>
          </form>
        }
      </div>
    </>
  );
}
