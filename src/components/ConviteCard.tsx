// src/components/ConviteCard.tsx

import React from 'react';
import Image from 'next/image';

// Definindo o tipo para um membro da banca
type BancaMember = {
  id: number;
  nome: string;
  papel: string;
};

interface ConviteCardProps {
  instituicaoTexto: string;
  instituicaoLogoUrl: string;
  fotoCandidatoUrl: string;
  tipoDefesa: string;
  titulo: string;
  candidato: string;
  banca: BancaMember[];
  data: string;
  hora: string;
  emailOrientador: string;
}

const ConviteCard = React.forwardRef<HTMLDivElement, ConviteCardProps>((props, ref) => {
  const {
    instituicaoLogoUrl,
    instituicaoTexto,
    fotoCandidatoUrl,
    tipoDefesa,
    candidato,
    titulo,
    data,
    hora,
    emailOrientador,
    banca = []
  } = props;

  const primaryRed = "#a12e1a";
  const lightRedBg = "#fce9e4";
  const lightRedBorder = "#e99d7b";
  const textColor = "#3a3a3a";

  return (
    <div ref={ref} className="w-[1000px] min-h-[562px] bg-white p-8 flex flex-col font-serif shadow-xl border-2" style={{ borderColor: primaryRed, color: textColor }}>
      
      <header className="flex justify-between items-center pb-4 border-b-4" style={{ borderColor: primaryRed }}>
        <div className="w-[30%] flex items-center gap-4">
          <Image 
            key={instituicaoLogoUrl}
            src={instituicaoLogoUrl || "/assets/logos/placeholder-logo.png"} 
            alt="Logo Instituição" 
            width={80} 
            height={90} 
            objectFit="contain" 
            className="flex-shrink-0"
            unoptimized
          />
          <p className="whitespace-pre-line text-sm font-semibold leading-tight">{instituicaoTexto}</p>
        </div>
        
        <div className="text-center w-[40%]">
          <p className="font-bold text-base leading-tight">Mestrado Profissional Educação Física em Rede Nacional (PROEF)</p>
          <p className="text-sm">Departamento Acadêmico de Educação</p>
          <p className="text-sm">Núcleo de Educação Física e Saúde</p>
        </div>
        
        <div className="w-[30%] flex justify-end">
          <Image 
            key="proef-logo-static"
            src="/assets/logos/proef.jpg" 
            alt="Logo PROEF" 
            width={100} 
            height={100} 
            objectFit="contain"
            unoptimized
          />
        </div>
      </header>
      
      <main className="flex-grow flex flex-col justify-center py-4">
        <div className="flex w-full items-center gap-8 mb-6">
          <div className="w-[180px] h-[220px] flex-shrink-0 flex justify-center items-center overflow-hidden rounded-full border-4" style={{ borderColor: primaryRed }}>
            <Image 
              src={fotoCandidatoUrl || "/assets/logos/placeholder-foto.png"} 
              alt="Foto do Candidato" 
              width={180} 
              height={220}
              className="object-cover w-full h-full"
              unoptimized
            />
          </div>
          <div className="flex-grow flex flex-col text-center items-center">
              <h2 className="text-5xl font-extrabold mb-2">Convite</h2>
              <p className="text-lg font-bold mb-3">{tipoDefesa || "Tipo de Defesa"}</p>
              <h3 className="text-4xl font-extrabold" style={{ color: primaryRed }}>{candidato || "Nome do Candidato"}</h3>
          </div>
        </div>

        <div className="w-full">
          <div className="py-4 px-6 border-t-4 border-b-4" style={{ backgroundColor: lightRedBg, borderColor: lightRedBorder }}>
            <p className="text-xl font-bold text-center break-words">{titulo || "Título do Projeto"}</p>
          </div>
        </div>
      </main>
      
      <footer className="flex justify-between items-start pt-4 text-sm mt-auto">
        <div className="text-left space-y-1 w-[350px]">
          <p><span className="font-bold">Data:</span> {data}</p>
          <p><span className="font-bold">Horário:</span> {hora}</p>
          <p><span className="font-bold">E-mail do Orientador:</span> {emailOrientador && <a href={`mailto:${emailOrientador}`} className="text-blue-600 underline break-all">{emailOrientador}</a>}</p>
        </div>

        <div className="h-24 border-l-4 mx-8" style={{ borderColor: primaryRed }}></div>

        <div className="text-left flex-grow">
          <p className="font-extrabold text-base mb-2">Banca Examinadora:</p>
          <div className="space-y-1">
            {banca.map(member => (
              <p key={member.id} className="whitespace-pre-line leading-tight text-sm">
                {member.nome} ({member.papel})
              </p>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
});

ConviteCard.displayName = 'ConviteCard';
export default ConviteCard;