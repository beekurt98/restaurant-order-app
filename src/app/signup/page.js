'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import PageHeader from '../components/PageHeader';
import Input from '../components/Input';
import UserInfo from '../components/UserInfo';
import Link from 'next/link';
import { useAuth } from '../components/AuthProvider';

export default function Signup() {
  const [warning, setWarning] = useState("");
  const { user } = useAuth();
  const router = useRouter();

  async function handleSignup(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    const { email, password, name } = formObj;

    const { error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
    if (error) {
      setWarning(error.message);
    } else {
      router.push('/');
    }
  };

  return (
    <>
      <PageHeader name={"Sign Up"} />
      <div className='page'>
        <UserInfo text='One small step for you, one giant leap for ramen-kind.' />
        {
          user
            ? router.push("/")
            : <form onSubmit={handleSignup} autoComplete='off'>
              <Input placeholder="Name" name='name' />
              <Input type='email' placeholder="Email" name='email' />
              <Input type="password" placeholder="Password" name='password' />
              <button>Sign Up</button>
              <Link className='auth-other-btn' href={"/login"}>Log in</Link>
              <p style={{ textAlign: "center" }}>{
                warning ? warning : ""
              }</p>
            </form>
        }

      </div></>
  );
}
