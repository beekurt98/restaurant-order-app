"use client";
import { useAuth } from "@/app/components/AuthProvider"
import PageHeader from "@/app/components/PageHeader";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Settings() {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.name?.split(" ")[0];
  const lastName = user?.user_metadata?.name?.split(" ").at(-1);

  console.log(user);
  
  
  async function signOut() {
    const { error } = await supabase.auth.signOut()
  }

  const pages = [
    {
      "name": "Profile",
      "path": "/profile",
      "id": 1,
    },{
      "name": "Addresses",
      "path": "/addresses",
      "id": 2,
    },{
      "name": "Payment Methods",
      "path": "/payment-methods",
      "id": 3,
    },{
      "name": "Password Management",
      "path": "/password-management",
      "id": 4,
    }
  ]

  return (
    <>
      <PageHeader name="Settings" />
      <div className="page settings-page">
        <div className="settings-user-info">
          <img src={user ? `https://ui-avatars.com/api/?background=588157&color=fff&name=${firstName}+${lastName}`: "/logos/12.png"} alt="" />
          <h2>{user?.user_metadata?.name}</h2>
          <p>{user?.email}</p>
        </div>
        <div className="setting-btns">
          {
            pages.map(x => <Link className="link-btn" key={x.id} href={x.path}>{x.name}</Link>)
          }
        </div>
        {
          user
            ? <div className="auth-controls sign-out-btn">
              <button onClick={signOut}>Sign Out</button>
            </div>
            : <div className="auth-controls">
              <Link href="/login">Login</Link>
              <Link href="/signup">Signup</Link>
            </div>
        }
      </div>
    </>
  )
}