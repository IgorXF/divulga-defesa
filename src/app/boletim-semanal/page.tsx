// src/app/boletim-semanal/page.tsx

"use client"; 

import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { mockDefesas, DefesaAgendada } from '@/lib/mockDefesas';
import DefesaItemCard from '@/components/DefesaItemCard'; 
import ConviteCard from '@/components/ConviteCard'; // Importar o ConviteCard aqui também

// Função para formatar a data e hora
const formatarDataHora = (data: Date): string => {
  return data.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function BoletimSemanalPage() {
  const invisibleCardRef = useRef<HTMLDivElement>(null); // Ref para o card invisível ÚNICO
  const [cardToDownloadData, setCardToDownloadData] = useState<DefesaAgendada | null>(null); // Estado para guardar os dados da defesa a baixar
  const [isGenerating, setIsGenerating] = useState(false); // Estado para feedback visual (opcional)

  // Filtra as defesas da semana (lógica existente)
  const hoje = new Date();
  const dataLimite = new Date();
  dataLimite.setDate(hoje.getDate() + 7);
  const defesasDaSemana = mockDefesas.filter(defesa => 
    defesa.dataHora >= hoje && defesa.dataHora <= dataLimite
  ).sort((a, b) => a.dataHora.getTime() - b.dataHora.getTime());

  // Função chamada pelo botão "Baixar Convite" de cada DefesaItemCard
  const handleInitiateDownload = (defesaData: DefesaAgendada) => {
    console.log("Iniciando download para:", defesaData.candidatoNome);
    setCardToDownloadData(defesaData); // Guarda os dados da defesa clicada
    setIsGenerating(true); // Ativa feedback visual (opcional)
  };

  // Efeito que executa a geração da imagem DEPOIS que o estado cardToDownloadData foi atualizado
  useEffect(() => {
    if (cardToDownloadData && invisibleCardRef.current) {
      console.log("Card invisível pronto para gerar imagem para:", cardToDownloadData.candidatoNome);
      const generateAndDownload = async () => {
        try {
          const dataUrl = await toPng(invisibleCardRef.current!, { // Usar o ref do card invisível único
            quality: 1.0,
            pixelRatio: 2.5,
            backgroundColor: '#ffffff',
            fetchRequest: (url) => {
              const cacheBustedUrl = new URL(url, window.location.href);
              cacheBustedUrl.searchParams.set('t', Date.now().toString());
              return fetch(cacheBustedUrl.href);
            },
          });

          const link = document.createElement('a');
          const fileName = cardToDownloadData.candidatoNome ? cardToDownloadData.candidatoNome.toLowerCase().replace(/\s+/g, '-') : 'convite';
          link.download = `convite-${fileName}.png`;
          link.href = dataUrl;
          link.click();

        } catch (err) {
          console.error('Oops, algo deu errado na geração da imagem!', err);
          alert('Não foi possível gerar a imagem do convite. Verifique o console.');
        } finally {
          setIsGenerating(false); // Desativa feedback visual
          setCardToDownloadData(null); // Limpa o estado para a próxima
          console.log("Download finalizado.");
        }
      };
      
      // Pequeno timeout para garantir que o DOM atualizou antes de gerar
      const timer = setTimeout(generateAndDownload, 100); 
      return () => clearTimeout(timer); // Limpa o timeout se o componente desmontar

    }
  }, [cardToDownloadData]); // Este efeito roda sempre que cardToDownloadData mudar

  return (
    <main className="container mx-auto p-4 sm:p-8 h-auto"> 
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">Boletim Semanal de Defesas</h1>
        <p className="text-lg text-gray-600 mt-2">Próximas defesas agendadas para os próximos 7 dias.</p>
        {isGenerating && <p className="text-blue-600 font-semibold mt-2">Gerando imagem...</p>}
      </header>

      {defesasDaSemana.length > 0 ? (
        <div className="space-y-6"> 
          {defesasDaSemana.map((defesa) => (
            <DefesaItemCard 
              key={defesa.id} 
              defesa={defesa} 
              formatarDataHora={formatarDataHora}
              onDownloadClick={handleInitiateDownload} // Passa a função para iniciar o download
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">Nenhuma defesa agendada para os próximos 7 dias.</p>
      )}

      {/* --- O ÚNICO Card Invisível --- */}
      {/* Renderiza apenas se houver dados para baixar, posicionado fora da tela */}
      {cardToDownloadData && (
        <div className="absolute -left-[9999px] top-0 p-4 opacity-0 pointer-events-none"> 
          <div className="w-[1000px]"> {/* Container com a largura exata */}
            <ConviteCard
                ref={invisibleCardRef} // A ref agora está aqui
                instituicaoTexto={cardToDownloadData.instituicaoCardText}
                instituicaoLogoUrl={cardToDownloadData.instituicaoLogoUrl}
                fotoCandidatoUrl={cardToDownloadData.candidatoFotoUrl}
                tipoDefesa={cardToDownloadData.tipoDefesa}
                titulo={cardToDownloadData.titulo}
                candidato={cardToDownloadData.candidatoNome}
                banca={cardToDownloadData.banca} 
                data={cardToDownloadData.dataHora.toLocaleDateString('pt-BR')} 
                hora={cardToDownloadData.dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} 
                emailOrientador={cardToDownloadData.orientadorEmail}
            />
          </div>
        </div>
      )}
      {/* --- FIM DO CARD INVISÍVEL --- */}
    </main>
  );
}