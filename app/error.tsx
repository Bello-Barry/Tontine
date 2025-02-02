'use client';

import Link from 'next/link';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-2xl mt-4">Page non trouvée</p>
      <p className="text-gray-500 mt-2">La page que vous recherchez n'existe pas.</p>
      <div className="mt-6">
        <Link href="/" className="text-blue-500 underline">Retourner à l'accueil</Link>
      </div>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Réessayer
      </button>
    </div>
  );
}
