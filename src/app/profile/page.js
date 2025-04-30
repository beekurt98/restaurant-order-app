'use client';

import { supabase } from '../../lib/supabase';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../components/AuthProvider';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <ProtectedRoute>
      <div>
        <h1>Profile</h1>
        <p>Welcome, {user?.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </ProtectedRoute>
  );
}
