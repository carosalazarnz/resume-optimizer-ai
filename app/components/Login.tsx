'use client';
import { supabase } from '../../lib/supabaseClient';
import { useState } from 'react';
export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setMessage('');
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your email for the login link!');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 p-6 max-w-md mx-auto border rounded-lg mt-20">
      <h2 className="text-2xl font-bold">Login to Resume Optimizer AI</h2>
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={handleLogin}
        disabled={loading}
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        {loading ? 'Sending...' : 'Send Magic Link'}
      </button>
      {message && <p className="text-center text-sm">{message}</p>}
    </div>
  );
}
