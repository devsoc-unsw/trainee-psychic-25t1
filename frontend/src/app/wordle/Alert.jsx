import React from 'react';

export default function Alert({message}) {
  return (
    <button className="px-6 py-2 bg-black text-white rounded-lg font-semibold transform hover:-translate-y-1 transition duration-400">
      {message}
    </button>
  );
}