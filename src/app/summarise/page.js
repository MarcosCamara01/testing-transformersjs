'use client'

import { useState } from 'react'

export default function Classify() {

  const [result, setResult] = useState(null);
  const [ready, setReady] = useState(null);

  const classify = async (text) => {
    if (!text) return;
    if (ready === null) setReady(false);

    const result = await fetch(`/api/summarise?text=${encodeURIComponent(text)}`);

    if (!ready) setReady(true);

    const json = await result.json();
    console.log(json)
    setResult(json[0].summary_text);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <h1 className="text-5xl font-bold mb-2 text-center">Summarization</h1>
      <h2 className="text-2xl mb-4 text-center">Next.js template (server-side)</h2>
      <textarea
        type="text"
        className="w-full max-w-sm h-20 max-h-64 text-black p-2 border border-gray-300 rounded mb-4"
        placeholder="Enter text here"
        onInput={e => {
          classify(e.target.value);
        }}
      />

      {ready !== null && (
        <p className="max-w-screen-sm text-white p-2 rounded">
          {
            (!ready || !result) ? 'Loading, be patient, this may take a few minutes...' : result}
        </p>
      )}
    </main>
  )
}