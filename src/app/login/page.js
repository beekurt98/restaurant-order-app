'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthProvider';
import PageHeader from '../components/PageHeader';
import Input from '../components/Input';

export default function Login() {
  const [loading, setLoading] = useState(true);
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
      console.log(error.message);
    } else {
      router.push('/profile');
    }
  };

  return (
    <>
      <PageHeader name={"Logins"} />
      <div className='page'>
        {user
          ? "hello!"
          : <>
            <form onSubmit={handleLogin} autoComplete='off'>
              <Input name={"email"} type={"type"} placeholder={"Email"} /><br />
              <Input name={"password"} type={"password"} placeholder={"Password"} /><br />
              <button>Login</button>
            </form>
          </>}
      </div>
    </>
  );
}
