// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Garanta que este import esteja aqui

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Divulga Defesa - Gerador de Convites",
  description: "Crie e divulgue convites para defesas acadêmicas de forma fácil e rápida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* CORREÇÃO: Removidas classes como min-h-screen ou h-screen daqui */}
      <body className={inter.className}> 
        {children} 
      </body>
    </html>
  );
}