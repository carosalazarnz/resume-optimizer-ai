export const dynamic = 'force-dynamic';
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../components/supabaseClient';
import { User } from '@supabase/supabase-js';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  if (!user) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Resume Optimizer Dashboard</h1>
      <p className="mb-2">Logged in as: <strong>{user.email}</strong></p>
      <div className="border-t pt-4 mt-4">
        <h2 className="text-xl font-semibold mb-3">Your Credits</h2>
        <p className="text-gray-700">You have <strong>3 free scans</strong> remaining.</p>
        <p className="text-sm text-gray-500 mt-2">Next: Upload your resume to get AI-powered improvements.</p>
      </div>
    </div>
  );
}
