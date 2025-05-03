'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthProvider';
import PageHeader from '../components/PageHeader';
import Input from '../components/Input';
import UserInfo from '../components/UserInfo';
import Link from 'next/link';

export default function Login() {
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState("");
  const { user } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   user && router.push('/profile')
  // }, [])

  async function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    const { email, password } = formObj;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setWarning(error.message);
    } else {
      router.push('/');
    }
  };

  return (
    <>
      <PageHeader name={"Login"} />
      <div className='page'>
        <UserInfo text={"Back for another bowl of goodness?"} />
        {user
          ? ""
          : <>
            <form onSubmit={handleLogin} autoComplete='off'>
              <Input name={"email"} type={"type"} placeholder={"Email"} />
              <Input name={"password"} type={"password"} placeholder={"Password"} />
              <button>Login</button>
              <Link className='auth-other-btn' href={"/signup"}>Sign Up</Link>
              <p style={{ textAlign: "center" }}>{
                warning ? warning : ""
              }</p>
            </form>
          </>}
      </div>
    </>
  );
}
