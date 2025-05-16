'use client'

import { useState } from "react";
import Link from 'next/link';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const Register = (e) => {
    e.preventDefault();
    console.log('aaa')

    // register logic inside here
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-blue-100">
      <div className="flex-col bg-white p-5 gap-3 rounded-lg">
        <h1 className="text-center text-3xl font-bold mb-7">Register</h1>
        <form onSubmit={Register}>
          {/* username input */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Username</legend>
            <label className="input">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </label>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <label className="input">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
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

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Confirm password</legend>
            <label className="input input-bordered flex items-center gap-2 w-80">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
              />
            </label>
          </fieldset>

          {/* Submit Button */}
          <button className="btn btn-primary w-80 mt-3" type="submit">
            Register
          </button>

          <div className="mt-5 text-center">
            Have an account already? <Link href="/login" className="text-blue-600 underline hover:text-blue-800">Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}