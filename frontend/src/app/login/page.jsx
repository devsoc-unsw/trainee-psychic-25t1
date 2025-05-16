'use client'

import { useState } from "react";
import Link from 'next/link';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const login = (e) => {
    e.preventDefault();
    console.log('aaa')

    // login logic inside here
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-blue-100">
      <div className="flex-col bg-white p-5 gap-3 rounded-lg">
        <h1 className="text-center text-3xl font-bold mb-7">Login</h1>
        <form onSubmit={login}>
          {/* username input */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Username</legend>
            <label className="input">
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Username or email"
                required
              />
            </label>
          </fieldset>

          {/* password input */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <label className="input input-bordered flex items-center gap-2 w-80">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </label>
          </fieldset>

          {/* Submit Button */}
          <button className="btn btn-primary w-80 mt-3" type="submit">
            Login
          </button>

          <div className="mt-5 text-center">
            Don&apos;t have an account? <Link href="/register" className="text-blue-600 underline hover:text-blue-800">Signup now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}