"use client";

import { useAuth } from "./AuthProvider";

export default function UserInfo({ text = ""}) {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.name?.split(" ")[0];
  const lastName = user?.user_metadata?.name?.split(" ").at(-1);

  return (
    <>
      <div className="settings-user-info">
        <img src={user ? `https://ui-avatars.com/api/?background=588157&color=fff&name=${firstName}+${lastName}` : "/logos/12.png"} alt="" />
        <h2>{user ? user?.user_metadata?.name : "Welcome to Zen Ramen"}</h2>
        <p>{user ? user?.email : text}</p>
      </div>
    </>
  )
}