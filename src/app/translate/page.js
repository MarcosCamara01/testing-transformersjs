'use client';

import { useState } from 'react';

export default function Classify() {
  const [result, setResult] = useState(null);
  const [ready, setReady] = useState(null);
  const [fromLanguage, setFromLanguage] = useState('eng_Latn');
  const [toLanguage, setToLanguage] = useState('eng_Latn');
  const [text, setText] = useState('');

  const SUPPORTED_LANGUAGES = {
    "eng_Latn": "English",
    "spa_Latn": "Español",
    "deu_Latn": "Deutsch",
    "nld_Latn": "Dutch",
    "fra_Latn": "French",
    "ita_Latn": "Italian"
  }

  const classify = async () => {
    if (!text || !fromLanguage || !toLanguage) return;

    if (ready === null) setReady(false);

    const result = await fetch(
      `/api/translate?text=${encodeURIComponent(text)}&from=${encodeURIComponent(fromLanguage)}&to=${encodeURIComponent(toLanguage)}`
    );

    if (!ready) setReady(true);

    const json = await result.json();
    console.log(json);
    setResult(json[0].translation_text);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <h1 className="text-5xl font-bold mb-2 text-center">Translation</h1>
      <h2 className="text-2xl mb-4 text-center">Next.js template (server-side)</h2>
      <div className="w-full max-w-sm flex gap-4 place-content-between">
        <select
          className="mb-4 text-black px-3 py-1.5 rounded"
          onChange={(e) => {
            setFromLanguage(e.target.value);
          }}
        >
          {
            Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
              <option key={key} value={key}>
                {literal}
              </option>
            ))
          }
        </select>

        <select
          className="mb-4 text-black px-3 py-1.5 rounded"
          onChange={(e) => {
            setToLanguage(e.target.value);
          }}
        >
          {
            Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
              <option key={key} value={key}>
                {literal}
              </option>
            ))
          }
        </select>
      </div>
      <textarea
        type="text"
        className="w-full max-w-sm h-20 max-h-64 text-black p-2 border border-gray-300 rounded mb-4"
        placeholder="Enter text here"
        onChange={(e) => {
          setText(e.target.value);
        }}
      />

      <button onClick={classify}>
        Send
      </button>

      {ready !== null && (
        <p className="max-w-screen-sm text-white p-2 rounded">
          {!ready || !result ? 'Loading, be patient, this may take a few minutes...' : result}
        </p>
      )}

    </main>
  );
}
