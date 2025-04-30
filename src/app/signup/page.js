'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();

  async function handleSignup(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    const { email, password, name } = formObj;

    const { error } = await supabase.auth.signUp({ email, password, options: {data: {name}}});
    if (error) {
      console.log(error.message);
    } else {
      router.push('/login');
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSignup} autoComplete='off'>
        <input placeholder="Email" name='email' /><br />
        <input placeholder="Name" name='name' /><br />
        <input type="password" placeholder="Password" name='password' /><br />
        <button>Signup</button>
      </form>
      
    </div>
  );
}
