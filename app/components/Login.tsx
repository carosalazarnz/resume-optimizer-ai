  'use client';
import { supabase } from './supabaseClient';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // TEMPORARY: Test login without email (for development only)
  const handleTestLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'Test123456!',
    });
    if (error) {
      setMessage('Test login failed: ' + error.message);
    } else {
      setMessage('Test login successful! Redirecting...');
      window.location.href = '/dashboard';
    }
    setLoading(false);
  };

  const handleMagicLink = async () => {
    setLoading(true);
    setMessage('');
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your email for the magic link!');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 p-6 max-w-md mx-auto border rounded-lg mt-20">
      <h2 className="text-2xl font-bold">Login to Resume Optimizer AI</h2>
      
      <div className="border-t pt-4">
        <h3 className="font-semibold mb-2">Test Login (No Email)</h3>
        <button
          onClick={handleTestLogin}
          disabled={loading}
          className="bg-green-500 text-white py-2 rounded hover:bg-green-600 w-full"
        >
          {loading ? 'Loading...' : 'Test Login (Skip Email)'}
        </button>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold mb-2">Magic Link (Email)</h3>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={handleMagicLink}
          disabled={loading}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 w-full"
        >
          {loading ? 'Sending...' : 'Send Magic Link'}
        </button>
      </div>
      
      {message && <p className="text-center text-sm">{message}</p>}
    </div>
  );
}
