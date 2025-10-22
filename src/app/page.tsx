// src/app/page.tsx

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Bem-vindo ao Divulga Defesa
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          Uma ferramenta simples para criar e compartilhar convites profissionais para qualificações, dissertações e teses.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/gerar-convite"
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300 shadow-lg"
          >
            Criar um Convite Agora
          </Link>

          <Link
            href="/boletim-semanal"
            className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-700 transition-transform transform hover:scale-105 duration-300 shadow-lg"
          >
            Ver Boletim Semanal
          </Link>
        </div>
      </div>
    </main>
  );
}