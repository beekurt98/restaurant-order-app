"use client";
import { useAuth } from "@/app/components/AuthProvider";
import Input from "@/app/components/Input";
import PageHeader from "@/app/components/PageHeader";
import UserInfo from "@/app/components/UserInfo";
import { supabase } from "@/lib/supabase";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <PageHeader name={"Profile"} />
      <div className="page">
        <UserInfo />
        {isEditing ? (
          <EditingForm setIsEditing={setIsEditing} />
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="btn">
              Edit Info
            </button>
          </>
        )}
      </div>
    </>
  );
}

function EditingForm({ setIsEditing }) {
  const [user, setUser] = useState(null);
  // const { user, updateUser } = useAuth();

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      console.log(user);
    }
    getUser();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          updateUser(e);
          setIsEditing(false);
        }}
      >
        <Input
          name={"name"}
          placeholder="name"
          type="name"
          defaultVal={user?.user_metadata?.name}
        />
        <Input
          name={"email"}
          placeholder="email"
          type="email"
          defaultVal={user?.email}
        />
        <button type="submit">Change</button>
        <button type="button" onClick={() => setIsEditing(false)}>
          Go Back
        </button>
      </form>
    </>
  );
}
