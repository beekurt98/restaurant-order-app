'use client';
import Link from 'next/link';
import PageHeader from './components/PageHeader';
import { useAuth } from './components/AuthProvider';
import { useEffect, useState } from 'react';
import SingleItem from './components/SingleItem';
import { supabase } from '@/lib/supabase';
import Carousel from './components/Carousel';
import TrendingItems from './components/TrendingItems';

export default function Home() {
  const { user, signOut } = useAuth();


  return (
    <>
      <PageHeader name="Home" />
      <div className='page'>
        <Carousel />
        <div className='section-header'>
          <h2>Trending Items</h2>
          <Link href="/products">See All</Link>
        </div>
        <TrendingItems />
        

        {/* {
          !user
          && <div className="auth-controls">
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </div>
        } */}
      </div>
    </>
  );
}
