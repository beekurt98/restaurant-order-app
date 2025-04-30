"use client";
import { useAuth } from "@/app/components/AuthProvider"
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Settings() {
  const { user } = useAuth();

  async function signOut() {
    const { error } = await supabase.auth.signOut()
  }

  return (
    <>
      {
        user
        ? <button onClick={signOut}>Sign Out</button>
        : <>
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
        </>
      }
    </>
  )
}