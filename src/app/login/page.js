"use client";

import { useActionState, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { usePathname, useRouter } from "next/navigation";
import PageHeader from "../components/PageHeader";
import Input from "../components/Input";
import UserInfo from "../components/UserInfo";
import Link from "next/link";
import login from "@/lib/login-actions";

export default function Login() {
  const [state, formAction, pending] = useActionState(login, null);
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState("");
  const router = useRouter();

  // useEffect(() => {
  //   async function getUser() {
  //     const supabase = await createClien();
  //     const { data, error } = await supabase.auth.getUser();
  //     if (!error || data?.user) {
  //       redirect("/");
  //     }
  //   }
  //   getUser();
  // }, []);

  async function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    const { email, password } = formObj;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setWarning(error.message);
    } else {
      router.push("/");
    }
  }

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
