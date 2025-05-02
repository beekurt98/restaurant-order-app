"use client";
import { useAuth } from "@/app/components/AuthProvider";
import Input from "@/app/components/Input";
import PageHeader from "@/app/components/PageHeader";
import UserInfo from "@/app/components/UserInfo";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function getData() {
      let { data: users, error } = await supabase
        .from('users')
        .select('*')
      setUserInfo(users[0]);
      console.log(users);

    }

    getData();
  }, [])

  return (
    <>
      <PageHeader name={"Profile"} />
      <div className="page">
        <UserInfo />
        {isEditing
          ? <EditingForm setIsEditing={setIsEditing} />
          : <>
            <button onClick={() => setIsEditing(true)} className="btn">Edit Info</button>
          </>}
      </div>
    </>
  )
}

function EditingForm({ setIsEditing }) {
  const { user } = useAuth();
  const router = useRouter();

  async function updateUser(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, name } = Object.fromEntries(formData);
    const { data, error } = await supabase.auth.updateUser({
      email,
      data: { name }
    })
    // router.push("/profile");
    setIsEditing(false);

  }

  return (
    <>
      <form onSubmit={updateUser}>
        <Input name={"name"} placeholder="name" type="name" defaultVal={user?.user_metadata?.name} />
        <Input name={"email"} placeholder="email" type="email" defaultVal={user?.email} />
        <button type="submit">Change</button>
        <button type="button" onClick={() => setIsEditing(false)} >Go Back</button>

      </form>
    </>
  )
}