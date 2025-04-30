'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthProvider';

export default function Login() {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

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
    <div>
      {user
        ? "hello!" 
        : <>
          <h1>Login</h1>
          <form onSubmit={handleLogin} autoComplete='off'>
            <input placeholder="Email" name='email' /><br />
            <input type="password" placeholder="Password" name='password' /><br />
            <button>Login</button>
          </form>
        </>}
    </div>
  );
}
